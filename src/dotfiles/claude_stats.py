"""Claude context budget reporter.

Measures lines, words, and estimated tokens for each CLAUDE.md resource and
reports per-profile effective totals.  Uses a simple word-count approximation
(words × 4/3) — no external tokenizer required.
"""
from __future__ import annotations

import sys
from pathlib import Path
from typing import Optional

# Budget thresholds (estimated tokens, warnings only — not hard failures)
GLOBAL_BUDGET = 800
OVERLAY_BUDGET = 500


def estimate_tokens(text: str) -> int:
    """Return an estimated token count using a word-count approximation.

    Formula: words × 4 / 3 (rounds down).  This is a standard BPE
    approximation for English prose; good enough for budget checking.
    """
    return len(text.split()) * 4 // 3


def _measure(text: str) -> dict[str, int]:
    return {
        "lines": text.count("\n"),
        "words": len(text.split()),
        "tokens": estimate_tokens(text),
    }


def _fmt(label: str, stats: dict[str, int], budget: Optional[int] = None) -> str:
    lines = [label]
    lines.append(f"  lines:             {stats['lines']}")
    lines.append(f"  words:             {stats['words']}")
    tag = ""
    if budget is not None and stats["tokens"] > budget:
        tag = f"  [OVER BUDGET — limit {budget}]"
    lines.append(f"  estimated tokens:  {stats['tokens']}{tag}")
    return "\n".join(lines)


def _fmt_total(label: str, tokens: int, budget: Optional[int] = None) -> str:
    tag = ""
    if budget is not None and tokens > budget:
        tag = f"  [OVER BUDGET — limit {budget}]"
    return f"{label}\n  estimated tokens:  {tokens}{tag}"


def run_claude_stats(resources_dir: Optional[Path] = None) -> int:
    """Print a Claude context budget report.  Returns an exit code (0 = ok, 1 = over budget)."""
    from . import RESOURCES_DIR
    from .profiles import load_profiles

    resources = resources_dir or RESOURCES_DIR

    global_path = resources / "common" / "claude" / "CLAUDE.md"
    if not global_path.exists():
        print(f"Error: global CLAUDE.md not found at {global_path}", file=sys.stderr)
        return 1

    global_text = global_path.read_text()
    global_stats = _measure(global_text)

    # Find all profiles that append to .claude/CLAUDE.md
    profiles = load_profiles(resources)
    overlays: dict[str, Path] = {}
    for name, profile in profiles.items():
        for link in profile.links:
            if link.dst == ".claude/CLAUDE.md" and link.mode == "append":
                overlay_path = resources / link.src
                if overlay_path.exists():
                    overlays[name] = overlay_path

    print("Claude context budget\n")
    print(_fmt("global CLAUDE.md", global_stats, budget=GLOBAL_BUDGET))

    over_budget = global_stats["tokens"] > GLOBAL_BUDGET
    for profile_name, overlay_path in sorted(overlays.items()):
        overlay_text = overlay_path.read_text()
        overlay_stats = _measure(overlay_text)
        effective_tokens = estimate_tokens(global_text + "\n\n" + overlay_text)

        print()
        print(_fmt(f"{profile_name} overlay", overlay_stats, budget=OVERLAY_BUDGET))
        print()
        print(_fmt_total(f"{profile_name} effective total", effective_tokens))

        if overlay_stats["tokens"] > OVERLAY_BUDGET:
            over_budget = True

    return 1 if over_budget else 0
