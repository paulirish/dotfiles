"""Tests for profile loading and composition."""
import pytest
from pathlib import Path

from dotfiles import RESOURCES_DIR
from dotfiles.profiles import load_profiles, resolve_links, LinkSpec


@pytest.fixture()
def profiles():
    return load_profiles(RESOURCES_DIR)


def test_load_profiles_returns_all_expected(profiles):
    expected = {"common", "macos", "linux", "cluster", "codeocean", "codespace"}
    assert expected.issubset(set(profiles.keys()))


def test_common_has_links(profiles):
    assert len(profiles["common"].links) > 0


def test_profile_inherits_field(profiles):
    assert "common" in profiles["macos"].inherits
    assert "linux" in profiles["cluster"].inherits


def test_resolve_common_links(profiles):
    links = resolve_links("common", profiles)
    dsts = [l.dst for l in links]
    assert ".bashrc" in dsts
    assert ".bash_profile" in dsts
    assert ".gitconfig" in dsts
    assert ".claude/CLAUDE.md" in dsts


def test_macos_inherits_common(profiles):
    common_links = {l.dst for l in resolve_links("common", profiles)}
    macos_links  = {l.dst for l in resolve_links("macos", profiles)}
    # macOS should include everything from common
    assert common_links.issubset(macos_links)
    # plus its own overlays
    assert ".aliases.macos" in macos_links
    assert ".exports.macos" in macos_links


def test_cluster_inherits_linux_and_common(profiles):
    common_links = {l.dst for l in resolve_links("common", profiles)}
    cluster_links = {l.dst for l in resolve_links("cluster", profiles)}
    assert common_links.issubset(cluster_links)
    assert ".exports.linux" in cluster_links
    assert ".exports.cluster" in cluster_links
    assert ".Rprofile" in cluster_links


def test_no_duplicate_dsts(profiles):
    """Each dst should appear at most once — append-mode entries share a dst
    with the base link, but resolve_links returns them separately (base + appends),
    so we check only the link-mode (base) entries for uniqueness."""
    for name in profiles:
        links = resolve_links(name, profiles)
        base_dsts = [l.dst for l in links if l.mode == "link"]
        assert len(base_dsts) == len(set(base_dsts)), (
            f"Duplicate link-mode dst in profile '{name}': {base_dsts}"
        )


def test_codeocean_claude_md_is_append(profiles):
    """codeocean profile should append its CLAUDE.md rather than overwrite common's."""
    links = resolve_links("codeocean", profiles)
    claude_links = [l for l in links if l.dst == ".claude/CLAUDE.md"]
    # one base link from common, one append from codeocean
    assert len(claude_links) == 2
    assert claude_links[0].mode == "link"
    assert claude_links[1].mode == "append"
    assert "common" in claude_links[0].src
    assert "codeocean" in claude_links[1].src


def test_append_mode_concat(tmp_path):
    """resolve_links + installer should produce a concatenated file for append-mode."""
    import tomllib
    from dotfiles.install import run_install

    ok = run_install(profile="codeocean", dry_run=False, home=tmp_path)
    assert ok is True
    claude_md = tmp_path / ".claude" / "CLAUDE.md"
    assert claude_md.exists()
    assert not claude_md.is_symlink()          # generated file, not symlink
    content = claude_md.read_text()
    assert "Global Claude Code Preferences" in content   # from common
    assert "Code Ocean Capsule Conventions" in content   # from codeocean append


def test_unknown_profile_raises(profiles):
    with pytest.raises(ValueError, match="Unknown profile"):
        resolve_links("doesnotexist", profiles)


def test_all_sources_exist(profiles):
    """Every link source referenced in profiles.toml must exist on disk."""
    missing = []
    for name in profiles:
        for link in resolve_links(name, profiles):
            src = RESOURCES_DIR / link.src
            if not src.exists():
                missing.append(f"{name}: {link.src}")
    assert not missing, f"Missing resource files:\n" + "\n".join(missing)
