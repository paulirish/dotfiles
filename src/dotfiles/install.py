"""Safe, idempotent dotfiles installer."""
from __future__ import annotations

import json
import subprocess
import sys
from collections import defaultdict
from datetime import datetime, timezone
from enum import Enum, auto
from pathlib import Path
from typing import Optional

from .profiles import LinkSpec, load_profiles, resolve_links
from .platform import detect_platform


# Location of the installer state file, relative to $HOME
_STATE_FILE = Path(".config/dotfiles/state.json")
# Location of the active profile name (read by .bash_profile at shell startup)
_PROFILE_FILE = Path(".config/dotfiles/profile")


class Result(Enum):
    UNCHANGED = auto()           # Already symlinked to the correct target
    LINKED = auto()              # New symlink created
    BACKED_UP_AND_LINKED = auto()  # Existing file backed up, then linked
    DRY = auto()                 # Would have been linked (dry-run)
    ERROR = auto()


class _Report:
    __slots__ = ("result", "dst", "src", "backup", "error")

    def __init__(
        self,
        result: Result,
        dst: Path,
        src: Path,
        backup: Optional[Path] = None,
        error: Optional[str] = None,
    ) -> None:
        self.result = result
        self.dst = dst
        self.src = src
        self.backup = backup
        self.error = error


def get_resources_dir() -> Path:
    """Return the path to the ``resources/`` directory bundled with this package.

    Works for both editable (``pip install -e .``) and installed
    (``uv tool install``) builds because it uses ``__file__`` rather than
    ``importlib.resources``.
    """
    return Path(__file__).parent / "resources"


# ── Public entry points ───────────────────────────────────────────────────────

def run_install(
    profile: Optional[str] = None,
    dry_run: bool = False,
    home: Optional[Path] = None,
) -> bool:
    """Install dotfiles for *profile*.

    Returns ``True`` on success, ``False`` if any link failed.
    """
    home = home or Path.home()
    resources = get_resources_dir()

    # Detect / validate profile
    try:
        info = detect_platform(override=profile)
    except ValueError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return False

    profile_name = info.platform
    prefix = "[dry-run] " if dry_run else ""
    print(f"{prefix}Installing profile: {profile_name}")
    print(f"  Signals : {', '.join(info.signals)}")
    print(f"  Resources: {resources}")
    print()

    # Resolve links for this profile
    profiles = load_profiles(resources)
    try:
        links = resolve_links(profile_name, profiles)
    except ValueError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return False

    # Group links by dst — base (link mode) + any appends for the same dst
    base_links: dict[str, LinkSpec] = {}
    append_links: dict[str, list[LinkSpec]] = defaultdict(list)
    for lnk in links:
        if lnk.mode == "append":
            append_links[lnk.dst].append(lnk)
        else:
            base_links[lnk.dst] = lnk

    # Install each link (concat when a dst has append entries)
    reports: list[_Report] = []
    for dst_rel, base in base_links.items():
        if dst_rel in append_links:
            srcs = [resources / base.src] + [resources / a.src for a in append_links[dst_rel]]
            rpt = _install_concat(srcs=srcs, dst=home / dst_rel, dry_run=dry_run)
        else:
            rpt = _install_link(src=resources / base.src, dst=home / dst_rel, dry_run=dry_run)
        reports.append(rpt)
        _print_line(rpt)

    # Persist state & profile name
    if not dry_run:
        _write_state(home, profile_name, resources, links)
        _write_profile_file(home, profile_name)
        _configure_git_credential_helper(profile_name)

    # Summary
    n_linked = sum(
        1 for r in reports
        if r.result in (Result.LINKED, Result.BACKED_UP_AND_LINKED, Result.DRY)
    )
    n_ok = sum(1 for r in reports if r.result == Result.UNCHANGED)
    n_err = sum(1 for r in reports if r.result == Result.ERROR)

    print()
    print(
        f"{'[dry-run] ' if dry_run else ''}Done: "
        f"{n_linked} installed, {n_ok} unchanged, {n_err} errors"
    )

    return n_err == 0


def run_status(home: Optional[Path] = None) -> int:
    """Print the current installation state.  Returns exit code."""
    state = read_state(home)
    if not state:
        print("dotfiles not installed. Run: dotfiles install")
        return 1

    print(f"Profile:   {state['profile']}")
    print(f"Installed: {state['installed_at']}")
    print(f"Resources: {state['resources_dir']}")
    print(f"\nInstalled files ({len(state['links'])}):")
    for dst_rel, src_rel in sorted(state["links"].items()):
        dst = (home or Path.home()) / dst_rel
        sym = "✓" if (dst.is_symlink()) else "✗"
        print(f"  {sym} ~/{dst_rel}")
    return 0


def read_state(home: Optional[Path] = None) -> Optional[dict]:
    """Return the saved installer state dict, or None if not installed."""
    state_file = (home or Path.home()) / _STATE_FILE
    if not state_file.exists():
        return None
    try:
        return json.loads(state_file.read_text())
    except (json.JSONDecodeError, OSError):
        return None


# ── Internal helpers ──────────────────────────────────────────────────────────

def _install_link(src: Path, dst: Path, dry_run: bool) -> _Report:
    """Create symlink dst → src with backup-on-conflict semantics."""
    if not src.exists():
        return _Report(
            Result.ERROR, dst, src,
            error=f"Source not found: {src}",
        )

    # Already a valid symlink to our resource
    if dst.is_symlink():
        try:
            if dst.resolve() == src.resolve():
                return _Report(Result.UNCHANGED, dst, src)
        except OSError:
            pass  # broken symlink — treat as existing file

    backup: Optional[Path] = None

    if dst.exists() or dst.is_symlink():
        ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        backup = dst.with_name(dst.name + f".dotfiles-backup.{ts}")
        if not dry_run:
            dst.rename(backup)

    if dry_run:
        return _Report(Result.DRY, dst, src, backup=backup)

    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.symlink_to(src)

    result = Result.BACKED_UP_AND_LINKED if backup else Result.LINKED
    return _Report(result, dst, src, backup=backup)


def _install_concat(srcs: list[Path], dst: Path, dry_run: bool) -> _Report:
    """Write dst as the concatenation of multiple source files.

    Used when a profile appends to a parent's file (e.g. a profile-specific
    CLAUDE.md appended to the common one).  The result is a regular file, not
    a symlink, so it is re-generated on every install run.
    """
    for src in srcs:
        if not src.exists():
            return _Report(Result.ERROR, dst, srcs[0], error=f"Source not found: {src}")

    combined = "\n\n".join(s.read_text() for s in srcs)

    # Idempotent: skip if dst already contains the same generated content
    if dst.exists() and not dst.is_symlink() and dst.read_text() == combined:
        return _Report(Result.UNCHANGED, dst, srcs[0])

    backup: Optional[Path] = None
    if dst.exists() or dst.is_symlink():
        ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        backup = dst.with_name(dst.name + f".dotfiles-backup.{ts}")
        if not dry_run:
            dst.rename(backup)

    if dry_run:
        return _Report(Result.DRY, dst, srcs[0], backup=backup)

    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(combined)
    result = Result.BACKED_UP_AND_LINKED if backup else Result.LINKED
    return _Report(result, dst, srcs[0], backup=backup)


def _print_line(rpt: _Report) -> None:
    # Show the path relative to home (e.g. .claude/CLAUDE.md not just CLAUDE.md)
    home = Path.home()
    try:
        display = str(rpt.dst.relative_to(home))
    except ValueError:
        display = str(rpt.dst)

    match rpt.result:
        case Result.UNCHANGED:
            print(f"  ✓ ~/{display}")
        case Result.LINKED:
            print(f"  → ~/{display}")
        case Result.BACKED_UP_AND_LINKED:
            print(f"  → ~/{display}  (backed up: {rpt.backup.name})")
        case Result.DRY:
            bak = f"  (would back up: {rpt.backup.name})" if rpt.backup else ""
            print(f"  [dry] → ~/{display}{bak}")
        case Result.ERROR:
            print(f"  ✗ ~/{display}  ERROR: {rpt.error}", file=sys.stderr)


def _write_state(
    home: Path,
    profile_name: str,
    resources: Path,
    links: list[LinkSpec],
) -> None:
    state_file = home / _STATE_FILE
    state_file.parent.mkdir(parents=True, exist_ok=True)
    state = {
        "profile": profile_name,
        "resources_dir": str(resources),
        "installed_at": datetime.now(timezone.utc).isoformat(),
        "links": {lnk.dst: lnk.src for lnk in links},
    }
    state_file.write_text(json.dumps(state, indent=2) + "\n")


def _write_profile_file(home: Path, profile_name: str) -> None:
    """Write the active profile name so ``.bash_profile`` can read it."""
    profile_file = home / _PROFILE_FILE
    profile_file.parent.mkdir(parents=True, exist_ok=True)
    profile_file.write_text(profile_name + "\n")


def _configure_git_credential_helper(profile_name: str) -> None:
    """Configure git credential helper appropriate for the platform."""
    import shutil

    if not shutil.which("git"):
        return

    def _git_cfg(key: str, value: str) -> None:
        subprocess.run(
            ["git", "config", "--global", key, value],
            check=False, capture_output=True,
        )

    if profile_name == "macos":
        # On macOS, use gh credential helper via PATH (not hardcoded Homebrew path)
        _git_cfg(
            "credential.https://github.com.helper",
            "!/usr/bin/env gh auth git-credential",
        )
        _git_cfg(
            "credential.https://gist.github.com.helper",
            "!/usr/bin/env gh auth git-credential",
        )
    elif profile_name in ("codespace",):
        # Codespaces handles GitHub auth natively; gh is always available
        if shutil.which("gh"):
            _git_cfg(
                "credential.https://github.com.helper",
                "gh auth git-credential",
            )
    elif profile_name == "cluster":
        # On HPC clusters, use plaintext store (no keychain)
        _git_cfg("credential.helper", "store")
