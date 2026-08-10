"""Tests for Claude context budget invariants.

These tests enforce structural properties, not exact prose.  They are
intentionally tolerant of wording changes but strict about:

- token budgets
- content isolation (no environment-specific text leaking into global)
- composition correctness
- estimation determinism
"""
from __future__ import annotations

import tempfile
from pathlib import Path

import pytest

from dotfiles import RESOURCES_DIR
from dotfiles.claude_stats import estimate_tokens, GLOBAL_BUDGET, OVERLAY_BUDGET
from dotfiles.profiles import load_profiles, resolve_links

# ── helpers ───────────────────────────────────────────────────────────────────

GLOBAL_MD = RESOURCES_DIR / "common" / "claude" / "CLAUDE.md"
CODEOCEAN_MD = RESOURCES_DIR / "codeocean" / "claude" / "CLAUDE.md"


def _global_text() -> str:
    return GLOBAL_MD.read_text()


def _codeocean_text() -> str:
    return CODEOCEAN_MD.read_text()


# ── budget tests ──────────────────────────────────────────────────────────────

def test_global_claude_within_budget():
    """Global CLAUDE.md must stay within the token budget."""
    tokens = estimate_tokens(_global_text())
    assert tokens <= GLOBAL_BUDGET, (
        f"Global CLAUDE.md is {tokens} estimated tokens (budget: {GLOBAL_BUDGET}). "
        "Trim it or raise the budget intentionally."
    )


def test_codeocean_overlay_within_budget():
    """Code Ocean overlay must stay within the overlay token budget."""
    tokens = estimate_tokens(_codeocean_text())
    assert tokens <= OVERLAY_BUDGET, (
        f"codeocean CLAUDE.md overlay is {tokens} estimated tokens (budget: {OVERLAY_BUDGET}). "
        "Trim it or raise the budget intentionally."
    )


# ── content-isolation tests ───────────────────────────────────────────────────

def test_no_scratch_in_global():
    """/scratch is a Code Ocean-specific path; must not appear in global CLAUDE.md."""
    assert "/scratch" not in _global_text(), (
        "Global CLAUDE.md contains '/scratch', which is Code Ocean-specific. "
        "Move it to the codeocean overlay."
    )


def test_no_cfg_memory_path_in_global():
    """The brittle /cfg/projects harness path must not appear in global CLAUDE.md."""
    assert "/cfg/projects" not in _global_text(), (
        "Global CLAUDE.md references '/cfg/projects', a platform-specific memory path. "
        "Replace with portable memory policy guidance."
    )


def test_no_codeocean_text_in_global():
    """Code Ocean-specific content must not appear in the global resource."""
    text = _global_text()
    assert "Code Ocean" not in text, (
        "Global CLAUDE.md contains 'Code Ocean' text. "
        "Move it to the codeocean overlay."
    )
    assert "codeocean" not in text.lower(), (
        "Global CLAUDE.md references 'codeocean'. "
        "Move it to the codeocean overlay."
    )


# ── composition test ──────────────────────────────────────────────────────────

def test_codeocean_effective_context_contains_both(tmp_path):
    """The generated codeocean CLAUDE.md should contain content from both sources."""
    from dotfiles.install import run_install

    ok = run_install(profile="codeocean", dry_run=False, home=tmp_path)
    assert ok is True

    generated = tmp_path / ".claude" / "CLAUDE.md"
    assert generated.exists()
    assert not generated.is_symlink(), "codeocean CLAUDE.md should be a generated file, not a symlink"

    content = generated.read_text()
    # Global content: check for a distinctive phrase from the new global file
    assert "Working style" in content, "Generated file missing global 'Working style' section"
    # Overlay content: check for Code Ocean layout
    assert "Code Ocean" in content, "Generated file missing Code Ocean overlay content"
    assert "/scratch" in content, "Generated file missing /scratch reference from overlay"


# ── determinism test ─────────────────────────────────────────────────────────

def test_estimate_tokens_deterministic():
    """Token estimation must be purely deterministic."""
    sample = "This is a sample Claude instruction with some technical words."
    assert estimate_tokens(sample) == estimate_tokens(sample)
    assert estimate_tokens(sample) == estimate_tokens(sample)

    # Also verify the formula: words * 4 // 3
    words = len(sample.split())
    expected = words * 4 // 3
    assert estimate_tokens(sample) == expected


def test_estimate_tokens_empty():
    assert estimate_tokens("") == 0


def test_estimate_tokens_no_external_calls(monkeypatch):
    """estimate_tokens must not make any I/O or subprocess calls."""
    import subprocess
    original_run = subprocess.run

    called = []

    def mock_run(*args, **kwargs):
        called.append(args)
        return original_run(*args, **kwargs)

    monkeypatch.setattr(subprocess, "run", mock_run)
    estimate_tokens("hello world test")
    assert not called, "estimate_tokens should not call subprocess.run"


# ── idempotency test ─────────────────────────────────────────────────────────

def test_codeocean_claude_md_idempotent(tmp_path):
    """Re-installing codeocean profile should not change the generated CLAUDE.md."""
    from dotfiles.install import run_install

    run_install(profile="codeocean", dry_run=False, home=tmp_path)
    first = (tmp_path / ".claude" / "CLAUDE.md").read_text()

    run_install(profile="codeocean", dry_run=False, home=tmp_path)
    second = (tmp_path / ".claude" / "CLAUDE.md").read_text()

    assert first == second, "Re-installing codeocean produced a different CLAUDE.md"


def test_non_overlay_profile_uses_symlink(tmp_path):
    """Profiles without a CLAUDE.md overlay should install a symlink to common."""
    from dotfiles.install import run_install

    # linux inherits common but has no overlay
    run_install(profile="linux", dry_run=False, home=tmp_path)
    claude_md = tmp_path / ".claude" / "CLAUDE.md"
    assert claude_md.exists()
    assert claude_md.is_symlink(), "Non-overlay profiles should install CLAUDE.md as a symlink"


# ── claude-stats output test ─────────────────────────────────────────────────

def test_claude_stats_output_contains_no_secret_values(capsys):
    """claude-stats must never print secret/credential values."""
    import os
    from dotfiles.claude_stats import run_claude_stats

    fake_secrets = [
        "sk-ant-FAKESECRET123",
        "ghp_FAKEGITHUBTOKEN456",
        "AKIAFAKEAWSKEY789",
        "fake-mem0-key-abc",
        "fake-openai-key-xyz",
    ]
    env_patch = {
        "ANTHROPIC_API_KEY": fake_secrets[0],
        "GH_TOKEN": fake_secrets[1],
        "AWS_ACCESS_KEY_ID": fake_secrets[2],
        "MEM0_API_KEY": fake_secrets[3],
        "OPENAI_API_KEY": fake_secrets[4],
    }
    original = {k: os.environ.get(k) for k in env_patch}
    try:
        os.environ.update(env_patch)
        run_claude_stats()
        captured = capsys.readouterr()
        output = captured.out + captured.err
        for secret in fake_secrets:
            assert secret not in output, f"Secret value '{secret}' leaked into claude-stats output"
    finally:
        for k, v in original.items():
            if v is None:
                os.environ.pop(k, None)
            else:
                os.environ[k] = v
