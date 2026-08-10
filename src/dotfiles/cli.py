"""dotfiles CLI — cross-platform dotfiles manager."""
from __future__ import annotations

import argparse
import sys


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="dotfiles",
        description="Cross-platform dotfiles manager (https://github.com/mikecuoco/dotfiles)",
    )
    parser.add_argument(
        "--version",
        action="version",
        version=f"%(prog)s {_version()}",
    )

    sub = parser.add_subparsers(dest="command", metavar="COMMAND")
    sub.required = True

    # ── install ──────────────────────────────────────────────────────────────
    p_install = sub.add_parser(
        "install",
        help="Install dotfiles for the active (or specified) profile",
    )
    p_install.add_argument(
        "--profile", "-p",
        metavar="PROFILE",
        help="Profile to install: macos | linux | cluster | codeocean | codespace "
             "(auto-detected if omitted)",
    )
    p_install.add_argument(
        "--dry-run", "-n",
        action="store_true",
        help="Show what would be done without making any changes",
    )
    p_install.add_argument(
        "--home",
        metavar="DIR",
        help="Override home directory (useful for testing)",
    )

    # ── doctor ───────────────────────────────────────────────────────────────
    p_doctor = sub.add_parser(
        "doctor",
        help="Check dotfiles installation health",
    )
    p_doctor.add_argument(
        "--json",
        action="store_true",
        help="Emit results as JSON",
    )

    # ── auth ─────────────────────────────────────────────────────────────────
    sub.add_parser(
        "auth",
        help="Check authentication status (Anthropic, GitHub, AWS, Mem0)",
    )

    # ── status ───────────────────────────────────────────────────────────────
    sub.add_parser(
        "status",
        help="Show currently installed dotfiles state",
    )

    # ── profiles ─────────────────────────────────────────────────────────────
    sub.add_parser(
        "profiles",
        help="List available profiles",
    )

    # ── claude-stats ─────────────────────────────────────────────────────────
    sub.add_parser(
        "claude-stats",
        help="Report Claude context budget (lines, words, estimated tokens per CLAUDE.md)",
    )

    args = parser.parse_args()

    match args.command:
        case "install":
            from pathlib import Path
            from .install import run_install
            home = Path(args.home) if args.home else None
            ok = run_install(profile=args.profile, dry_run=args.dry_run, home=home)
            sys.exit(0 if ok else 1)

        case "doctor":
            from .doctor import run_doctor
            sys.exit(run_doctor(as_json=args.json))

        case "auth":
            from .auth import run_auth
            sys.exit(run_auth())

        case "status":
            from .install import run_status
            sys.exit(run_status())

        case "profiles":
            _list_profiles()

        case "claude-stats":
            from .claude_stats import run_claude_stats
            sys.exit(run_claude_stats())


def _list_profiles() -> None:
    from . import RESOURCES_DIR
    from .profiles import load_profiles
    profiles = load_profiles(RESOURCES_DIR)
    print("Available profiles:\n")
    for name, p in sorted(profiles.items()):
        inherits = f"  (inherits: {', '.join(p.inherits)})" if p.inherits else ""
        print(f"  {name:<12} {p.description}{inherits}")


def _version() -> str:
    from importlib.metadata import version, PackageNotFoundError
    try:
        return version("mike-dotfiles")
    except PackageNotFoundError:
        return "dev"
