"""Authentication health checks — checks presence, never prints values."""
from __future__ import annotations

import os
import shutil
import subprocess
from dataclasses import dataclass


@dataclass
class AuthStatus:
    name: str
    configured: bool
    message: str
    required: bool = True


# ── Individual checks ─────────────────────────────────────────────────────────

def check_anthropic() -> AuthStatus:
    """Check ANTHROPIC_API_KEY is set."""
    if os.environ.get("ANTHROPIC_API_KEY"):
        return AuthStatus("Anthropic / Claude", True, "ANTHROPIC_API_KEY is set")
    return AuthStatus(
        "Anthropic / Claude", False,
        "ANTHROPIC_API_KEY not set — export it or add to ~/.extra",
    )


def check_github() -> AuthStatus:
    """Check GitHub auth via GH_TOKEN env var or gh CLI."""
    if os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN"):
        return AuthStatus("GitHub", True, "GH_TOKEN is set")

    if shutil.which("gh"):
        try:
            result = subprocess.run(
                ["gh", "auth", "status"],
                capture_output=True, text=True, timeout=5,
            )
            if result.returncode == 0:
                # Extract the first meaningful line from gh auth status
                first = next(
                    (ln.strip() for ln in result.stdout.splitlines() if ln.strip()),
                    "logged in",
                )
                return AuthStatus("GitHub", True, f"gh: {first}")
            return AuthStatus(
                "GitHub", False,
                f"gh auth status failed — run: gh auth login",
            )
        except (subprocess.TimeoutExpired, OSError):
            pass

    return AuthStatus(
        "GitHub", False,
        "GH_TOKEN not set and gh CLI not found — install gh or set GH_TOKEN",
    )


def check_aws() -> AuthStatus:
    """Check AWS credentials via env vars, credentials file, or aws CLI."""
    has_key = bool(os.environ.get("AWS_ACCESS_KEY_ID"))
    has_secret = bool(os.environ.get("AWS_SECRET_ACCESS_KEY"))
    has_profile = bool(
        os.environ.get("AWS_PROFILE") or os.environ.get("AWS_DEFAULT_PROFILE")
    )
    creds_file = os.path.expanduser("~/.aws/credentials")

    env_source = (
        "AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY" if (has_key and has_secret)
        else "AWS_PROFILE" if has_profile
        else None
    )

    if shutil.which("aws"):
        try:
            result = subprocess.run(
                ["aws", "sts", "get-caller-identity",
                 "--output", "text", "--query", "Account"],
                capture_output=True, text=True, timeout=10,
            )
            if result.returncode == 0:
                acct = result.stdout.strip()
                src = f" via {env_source}" if env_source else ""
                return AuthStatus(
                    "AWS", True,
                    f"AWS account {acct}{src}",
                    required=False,
                )
            hint = result.stderr.strip()[:120] if result.stderr else "no credentials"
            return AuthStatus(
                "AWS", False,
                f"aws sts get-caller-identity failed: {hint}",
                required=False,
            )
        except (subprocess.TimeoutExpired, OSError):
            pass

    if env_source:
        return AuthStatus(
            "AWS", True,
            f"{env_source} set (not validated — aws CLI not found)",
            required=False,
        )
    if os.path.exists(creds_file):
        return AuthStatus(
            "AWS", True,
            "~/.aws/credentials exists (not validated — aws CLI not found)",
            required=False,
        )
    return AuthStatus(
        "AWS", False,
        "No AWS credentials found (optional)",
        required=False,
    )


def check_mem0() -> AuthStatus:
    """Check MEM0_API_KEY is set (optional service)."""
    if os.environ.get("MEM0_API_KEY"):
        return AuthStatus("Mem0", True, "MEM0_API_KEY is set", required=False)
    return AuthStatus(
        "Mem0", False,
        "MEM0_API_KEY not set (optional — skip if not using Mem0)",
        required=False,
    )


# ── Public API ────────────────────────────────────────────────────────────────

def all_statuses() -> list[AuthStatus]:
    return [check_anthropic(), check_github(), check_aws(), check_mem0()]


def run_auth() -> int:
    """Print authentication status.  Returns non-zero if a required service is missing."""
    statuses = all_statuses()
    missing_required = False

    print("Authentication\n" + "─" * 40)
    for s in statuses:
        icon = "✓" if s.configured else ("✗" if s.required else "–")
        opt = "" if s.required else " (optional)"
        print(f"  {icon} {s.name}{opt}")
        print(f"      {s.message}")
        if s.required and not s.configured:
            missing_required = True

    if missing_required:
        print("\nSome required credentials are missing.")
        return 1
    return 0
