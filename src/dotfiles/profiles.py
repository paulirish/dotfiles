"""Profile loading and composition for dotfiles."""
from __future__ import annotations

import tomllib
from dataclasses import dataclass
from pathlib import Path


VALID_MODES = frozenset({"link", "append"})


@dataclass(frozen=True)
class LinkSpec:
    """A single file-link specification: source path → destination in $HOME.

    mode:
      "link"   — create a symlink (default); last entry for a dst wins.
      "append" — concatenate onto whatever the parent linked for this dst;
                 all append entries are collected in order after the base.
    """
    src: str         # relative to resources/
    dst: str         # relative to $HOME
    mode: str = "link"


@dataclass
class Profile:
    name: str
    description: str
    inherits: list[str]
    links: list[LinkSpec]


def _make_link_spec(profile_name: str, lnk: dict) -> LinkSpec:
    """Validate and construct a LinkSpec from a raw TOML dict."""
    mode = lnk.get("mode", "link")
    if mode not in VALID_MODES:
        raise ValueError(
            f"Profile '{profile_name}': invalid mode {mode!r} for link "
            f"{lnk.get('src', '?')!r}. Valid modes: {sorted(VALID_MODES)}"
        )
    return LinkSpec(src=lnk["src"], dst=lnk["dst"], mode=mode)


def load_profiles(resources_dir: Path) -> dict[str, Profile]:
    """Load all profile definitions from ``resources/profiles.toml``."""
    profiles_path = resources_dir / "profiles.toml"
    with open(profiles_path, "rb") as fh:
        raw = tomllib.load(fh)

    profiles: dict[str, Profile] = {}
    for name, pdata in raw.get("profiles", {}).items():
        profiles[name] = Profile(
            name=name,
            description=pdata.get("description", ""),
            inherits=pdata.get("inherits", []),
            links=[
                _make_link_spec(name, lnk)
                for lnk in pdata.get("links", [])
            ],
        )
    return profiles


def resolve_links(profile_name: str, profiles: dict[str, Profile]) -> list[LinkSpec]:
    """Return the full, deduplicated list of links for *profile_name*.

    Inheritance is resolved depth-first (parent links first).  If the same
    destination path appears in both a parent and a child, the child's entry
    wins.
    """
    if profile_name not in profiles:
        available = ", ".join(sorted(profiles))
        raise ValueError(
            f"Unknown profile '{profile_name}'. Available: {available}"
        )

    def collect(name: str, visited: set[str]) -> list[LinkSpec]:
        if name in visited:
            return []
        visited.add(name)
        links: list[LinkSpec] = []
        for parent in profiles[name].inherits:
            links.extend(collect(parent, visited))
        links.extend(profiles[name].links)
        return links

    all_links = collect(profile_name, set())

    # "link" mode: deduplicate by dst — last occurrence (child) wins.
    # "append" mode: stack after the base link in declaration order.
    base: dict[str, LinkSpec] = {}
    appends: list[LinkSpec] = []
    for lnk in all_links:
        if lnk.mode == "append":
            appends.append(lnk)
        else:
            base[lnk.dst] = lnk  # last wins

    orphans = [a for a in appends if a.dst not in base]
    if orphans:
        details = ", ".join(f"{a.src!r} → {a.dst!r}" for a in orphans)
        raise ValueError(
            f"Profile '{profile_name}': append link(s) have no base link for "
            f"their dst: {details}"
        )

    return list(base.values()) + appends
