"""Tests for platform detection."""
import os
import pytest
from unittest.mock import patch

from dotfiles.platform import detect_platform, VALID_PROFILES

# Environment variables that must be absent for a detection test to be
# isolated from the GitHub Codespaces environment where the test suite runs.
_CODESPACE_VARS = frozenset({
    "CODESPACES",
    "GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN",
})
_ALL_PLATFORM_VARS = _CODESPACE_VARS | frozenset({
    "CODEOCEAN_ENV", "CO_REPO_ID",
    "SLURM_JOB_ID", "PBS_JOBID", "SGE_TASK_ID", "LSB_JOBID",
})


def _clean_env(*extra_drop: str) -> dict:
    """Return os.environ with all platform-signal vars stripped out."""
    drop = _ALL_PLATFORM_VARS | set(extra_drop)
    return {k: v for k, v in os.environ.items() if k not in drop}


def test_explicit_profile_override():
    info = detect_platform(override="macos")
    assert info.platform == "macos"
    assert "--profile macos" in info.signals[0]


def test_invalid_profile_raises():
    with pytest.raises(ValueError, match="Unknown profile"):
        detect_platform(override="nonexistent")


def test_codespaces_detection():
    with patch.dict(os.environ, {"CODESPACES": "true"}, clear=False):
        info = detect_platform()
    assert info.platform == "codespace"
    assert any("CODESPACES" in s for s in info.signals)


def test_codespaces_forwarding_domain():
    with patch.dict(
        os.environ,
        {"GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN": "app.github.dev"},
        clear=False,
    ):
        info = detect_platform()
    assert info.platform == "codespace"


def test_codeocean_detection():
    env = {**_clean_env(), "CO_REPO_ID": "abc123"}
    with patch.dict(os.environ, env, clear=True):
        info = detect_platform()
    assert info.platform == "codeocean"


def test_slurm_detection():
    env = {**_clean_env(), "SLURM_JOB_ID": "12345"}
    with patch.dict(os.environ, env, clear=True):
        info = detect_platform()
    assert info.platform == "cluster"
    assert any("SLURM_JOB_ID" in s for s in info.signals)


def test_pbs_detection():
    env = {**_clean_env(), "PBS_JOBID": "99.cluster"}
    with patch.dict(os.environ, env, clear=True):
        info = detect_platform()
    assert info.platform == "cluster"


@patch("dotfiles.platform.platform.system", return_value="Linux")
@patch("dotfiles.platform.socket.gethostname", return_value="workstation01")
def test_generic_linux(_h, _s):
    with patch.dict(os.environ, _clean_env(), clear=True):
        info = detect_platform()
    assert info.platform == "linux"


@patch("dotfiles.platform.platform.system", return_value="Darwin")
@patch("dotfiles.platform.socket.gethostname", return_value="MacBook-Pro")
def test_macos_detection(_h, _s):
    with patch.dict(os.environ, _clean_env(), clear=True):
        info = detect_platform()
    assert info.platform == "macos"


def test_all_valid_profiles_are_known():
    """Every profile in VALID_PROFILES can be used as an override."""
    for p in VALID_PROFILES:
        info = detect_platform(override=p)
        assert info.platform == p
