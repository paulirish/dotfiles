"""Tests for the safe, idempotent installer."""
import json
import os
from pathlib import Path

import pytest

from dotfiles.install import run_install, read_state, get_resources_dir


@pytest.fixture()
def fake_home(tmp_path):
    """Return a temporary directory that acts as $HOME."""
    return tmp_path


def test_install_codespace_dry_run(fake_home, capsys):
    ok = run_install(profile="codespace", dry_run=True, home=fake_home)
    assert ok is True
    captured = capsys.readouterr()
    assert "[dry-run]" in captured.out
    # Dry-run must not create any files
    assert list(fake_home.rglob(".*")) == []


def test_install_codespace_creates_symlinks(fake_home):
    ok = run_install(profile="codespace", dry_run=False, home=fake_home)
    assert ok is True

    # Core files should be symlinked
    for name in (".bashrc", ".bash_profile", ".gitconfig", ".aliases", ".inputrc"):
        link = fake_home / name
        assert link.is_symlink(), f"Expected symlink: {name}"
        assert link.exists(), f"Dangling symlink: {name}"


def test_install_is_idempotent(fake_home):
    """Running install twice should be a no-op the second time (no backups created)."""
    run_install(profile="codespace", dry_run=False, home=fake_home)
    run_install(profile="codespace", dry_run=False, home=fake_home)

    # No backup files should exist after idempotent re-install
    backups = list(fake_home.rglob("*.dotfiles-backup.*"))
    assert backups == [], f"Unexpected backups after idempotent install: {backups}"


def test_install_backs_up_existing_file(fake_home):
    """An unmanaged file at a target path should be backed up, not silently overwritten."""
    existing = fake_home / ".aliases"
    existing.write_text("# my custom aliases\n")

    ok = run_install(profile="codespace", dry_run=False, home=fake_home)
    assert ok is True

    # Original content is backed up
    backups = list(fake_home.glob(".aliases.dotfiles-backup.*"))
    assert len(backups) == 1
    assert backups[0].read_text() == "# my custom aliases\n"

    # Target is now a symlink
    assert (fake_home / ".aliases").is_symlink()


def test_install_writes_state_file(fake_home):
    run_install(profile="codespace", dry_run=False, home=fake_home)
    state = read_state(fake_home)
    assert state is not None
    assert state["profile"] == "codespace"
    assert "links" in state
    assert ".bashrc" in state["links"]


def test_install_writes_profile_file(fake_home):
    run_install(profile="codespace", dry_run=False, home=fake_home)
    profile_file = fake_home / ".config" / "dotfiles" / "profile"
    assert profile_file.exists()
    assert profile_file.read_text().strip() == "codespace"


def test_install_invalid_profile(fake_home, capsys):
    ok = run_install(profile="nonexistent_profile_xyz", dry_run=False, home=fake_home)
    assert ok is False
    captured = capsys.readouterr()
    assert "Unknown profile" in captured.err or "Unknown profile" in captured.out


def test_claude_config_directory_created(fake_home):
    run_install(profile="codespace", dry_run=False, home=fake_home)
    claude_md = fake_home / ".claude" / "CLAUDE.md"
    assert claude_md.is_symlink()
    assert claude_md.exists()


def test_dry_run_does_not_write_state(fake_home):
    run_install(profile="codespace", dry_run=True, home=fake_home)
    assert read_state(fake_home) is None


def test_resources_dir_exists():
    resources = get_resources_dir()
    assert resources.is_dir()
    assert (resources / "profiles.toml").exists()


def test_generated_file_not_backed_up_on_reinstall(fake_home):
    """Re-running install on a profile with append links must not create backups."""
    run_install(profile="codeocean", dry_run=False, home=fake_home)
    claude_md = fake_home / ".claude" / "CLAUDE.md"
    assert claude_md.exists() and not claude_md.is_symlink()

    # Second install — content unchanged → UNCHANGED, no backup
    run_install(profile="codeocean", dry_run=False, home=fake_home)
    backups = list((fake_home / ".claude").glob("CLAUDE.md.dotfiles-backup.*"))
    assert backups == [], f"Unexpected backup(s) after idempotent reinstall: {backups}"


def test_generated_file_updated_without_backup(fake_home, tmp_path):
    """If a source file changes, the generated file is replaced cleanly — no backup."""
    run_install(profile="codeocean", dry_run=False, home=fake_home)

    # Patch the codeocean CLAUDE.md source to simulate an upstream edit
    from dotfiles.install import get_resources_dir
    co_src = get_resources_dir() / "codeocean" / "claude" / "CLAUDE.md"
    original = co_src.read_text()
    try:
        co_src.write_text(original + "\n\n<!-- test patch -->")
        run_install(profile="codeocean", dry_run=False, home=fake_home)
    finally:
        co_src.write_text(original)

    backups = list((fake_home / ".claude").glob("CLAUDE.md.dotfiles-backup.*"))
    assert backups == [], f"Backup created for a generated file update: {backups}"

    claude_md = fake_home / ".claude" / "CLAUDE.md"
    assert "<!-- test patch -->" in claude_md.read_text()
