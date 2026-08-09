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
    for name in profiles:
        links = resolve_links(name, profiles)
        dsts = [l.dst for l in links]
        assert len(dsts) == len(set(dsts)), f"Duplicate dst in profile '{name}': {dsts}"


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
