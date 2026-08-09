"""mike-dotfiles — cross-platform personal dotfiles manager."""
from __future__ import annotations

from importlib.metadata import PackageNotFoundError, version
from pathlib import Path

try:
    __version__ = version("mike-dotfiles")
except PackageNotFoundError:
    __version__ = "dev"

#: Absolute path to the bundled resources directory.
#: Works for both editable (`pip install -e .`) and installed (`uv tool install`) builds.
RESOURCES_DIR: Path = Path(__file__).parent / "resources"
