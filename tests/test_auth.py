"""Tests for authentication checks."""
import os
from unittest.mock import patch, MagicMock

import pytest

from dotfiles.auth import (
    check_anthropic,
    check_github,
    check_aws,
    check_mem0,
    all_statuses,
    run_auth,
)


# ── Anthropic ─────────────────────────────────────────────────────────────────

def test_anthropic_configured():
    with patch.dict(os.environ, {"ANTHROPIC_API_KEY": "sk-test-abc123"}, clear=False):
        s = check_anthropic()
    assert s.configured is True
    assert "sk-test-abc123" not in s.message  # secret must not appear in output


def test_anthropic_not_configured():
    env = {k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"}
    with patch.dict(os.environ, env, clear=True):
        s = check_anthropic()
    assert s.configured is False
    assert s.required is True


# ── GitHub ────────────────────────────────────────────────────────────────────

def test_github_gh_token():
    with patch.dict(os.environ, {"GH_TOKEN": "ghs_fake"}, clear=False):
        s = check_github()
    assert s.configured is True
    assert "ghs_fake" not in s.message


def test_github_cli_logged_in():
    import shutil
    env = {k: v for k, v in os.environ.items()
           if k not in ("GH_TOKEN", "GITHUB_TOKEN")}
    with patch.dict(os.environ, env, clear=True), \
         patch("dotfiles.auth.shutil.which", return_value="/usr/bin/gh"), \
         patch("dotfiles.auth.subprocess.run") as mock_run:
        mock_run.return_value = MagicMock(returncode=0, stdout="Logged in to github.com\n")
        s = check_github()
    assert s.configured is True


def test_github_not_configured():
    env = {k: v for k, v in os.environ.items()
           if k not in ("GH_TOKEN", "GITHUB_TOKEN")}
    with patch.dict(os.environ, env, clear=True), \
         patch("dotfiles.auth.shutil.which", return_value=None):
        s = check_github()
    assert s.configured is False


# ── AWS ───────────────────────────────────────────────────────────────────────

def test_aws_env_vars_set_and_cli_validates():
    with patch.dict(os.environ, {
        "AWS_ACCESS_KEY_ID": "AKIAIOSFODNN7EXAMPLE",
        "AWS_SECRET_ACCESS_KEY": "secret",
    }, clear=False), \
    patch("dotfiles.auth.shutil.which", return_value="/usr/bin/aws"), \
    patch("dotfiles.auth.subprocess.run") as mock_run:
        mock_run.return_value = MagicMock(returncode=0, stdout="123456789012\n")
        s = check_aws()
    assert s.configured is True
    assert "AKIAIOSFODNN7EXAMPLE" not in s.message  # key must not appear in output
    assert "secret" not in s.message


def test_aws_not_required():
    s = check_aws()
    assert s.required is False


def test_mem0_optional():
    s = check_mem0()
    assert s.required is False


# ── Secrets never appear in output ───────────────────────────────────────────

SECRET_VALUES = ["sk-ant-abc123", "ghs_fake_token", "AKIAIOSFODNN7EXAMPLE",
                 "super_secret_key", "mem0_secret_key"]


@pytest.mark.parametrize("secret", SECRET_VALUES)
def test_secrets_not_in_auth_output(secret, capsys):
    env_override = {
        "ANTHROPIC_API_KEY": secret,
        "GH_TOKEN": secret,
        "AWS_ACCESS_KEY_ID": secret,
        "AWS_SECRET_ACCESS_KEY": secret,
        "MEM0_API_KEY": secret,
    }
    with patch.dict(os.environ, env_override, clear=False), \
         patch("dotfiles.auth.shutil.which", return_value=None):
        run_auth()
    captured = capsys.readouterr()
    assert secret not in captured.out, f"Secret '{secret}' appeared in stdout"
    assert secret not in captured.err, f"Secret '{secret}' appeared in stderr"
