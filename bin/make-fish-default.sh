#!/usr/bin/env bash
set -euo pipefail

# Installs fish (if missing), ensures it's listed in /etc/shells,
# then changes the current user's login shell to fish.

if ! command -v fish >/dev/null 2>&1; then
  echo "fish not found — installing via Homebrew..."
  brew install fish
fi

FISH_PATH="$(command -v fish)"

if ! grep -Fxq "$FISH_PATH" /etc/shells; then
  echo "Adding $FISH_PATH to /etc/shells (requires sudo)..."
  echo "$FISH_PATH" | sudo tee -a /etc/shells
fi

echo "Changing default shell to $FISH_PATH for user $USER (you may be prompted for your password)..."
chsh -s "$FISH_PATH"

echo "Done. Restart your terminal or log out/in to start using fish as your login shell."
