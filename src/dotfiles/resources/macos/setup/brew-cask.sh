#!/usr/bin/env bash
# Homebrew cask installer for macOS GUI apps
# Run after brew.sh: bash resources/macos/setup/brew-cask.sh

set -euo pipefail

# ── App Store access ──────────────────────────────────────────────────────────
brew install mas

# ── Daily productivity ────────────────────────────────────────────────────────
brew install --cask 1password
brew install --cask 1password-cli        # 'op' command for scripts / .functions.macos
brew install --cask rescuetime
brew install --cask google-chrome
brew install --cask raycast              # better Spotlight
brew install --cask iterm2

# ── AI tools ─────────────────────────────────────────────────────────────────
brew install --cask chatgpt
brew install --cask claude               # Claude desktop app
# Claude Code is installed via npm, not a cask:
#   npm install -g @anthropic-ai/claude-code
# Or via uv:
#   uv tool install @anthropic-ai/claude-code

# ── Academic / writing ────────────────────────────────────────────────────────
brew install --cask skim                 # PDF reader for papers
brew install --cask mathpix-snipping-tool  # LaTeX OCR

# ── Music ─────────────────────────────────────────────────────────────────────
brew install --cask spotify
brew install --cask rekordbox
# brew install --cask soulseek           # P2P music — install manually if needed

# ── Communication ─────────────────────────────────────────────────────────────
brew install --cask slack
brew install --cask discord
brew install --cask zoom
brew install --cask whatsapp

# ── Cloud storage / sync ─────────────────────────────────────────────────────
brew install rclone                      # CLI (already in brew.sh for redundancy check)
brew install --cask google-drive
brew install --cask dropbox

# ── Developer tools ───────────────────────────────────────────────────────────
brew install --cask docker
brew install --cask xquartz

# ── Bioscience / imaging ─────────────────────────────────────────────────────
brew install --cask fiji                 # ImageJ distribution for microscopy
brew install --cask imageoptim           # image compression
