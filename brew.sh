#!/bin/bash

# Install command-line tools using Homebrew

# (Optionally) Turn off brew's analytics https://docs.brew.sh/Analytics
# brew analytics off

# Thematic grouping of currently installed (on-request) packages
PACKAGES=(
  # GNU core utilities
  coreutils findutils gnu-sed gnu-tar grep gawk

  # Shells & Navigation
  fish bash-completion z

  # Git tools
  gh git-delta git-lfs git-filter-repo tig mergiraf

  # Search, Text & Modern CLI
  the_silver_searcher ripgrep fzf fd bat eza glow jq jdupes datamash pandoc pdfgrep cloc

  # Dev Runtimes & Build Tools
  node deno pnpm rbenv bazel gradle cmake ninja mkcert

  # Watchers & Linters
  watchexec entr shellcheck

  # Media, Networking & Data
  ffmpeg yt-dlp exiftool tree rename wget nmap pv pstree

  # System & Performance
  btop gdu ncdu zstd

  # AI
  llm

  # Graphics, Fonts & Processing
  fontforge fonttools vivictpp

)

brew install "${PACKAGES[@]}"
