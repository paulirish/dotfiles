#!/usr/bin/env bash
# Homebrew formula installer for macOS
# Run after setting up a new Mac: bash resources/macos/setup/brew.sh

set -euo pipefail

# Make sure Homebrew is up to date
brew update
brew upgrade

# ── GNU core utilities ────────────────────────────────────────────────────────
# macOS ships with BSD/Apple versions; GNU versions are more capable
brew install coreutils       # gls, gdate, etc.  (g-prefixed)
brew install moreutils       # sponge, ts, vidir, etc.
brew install findutils       # gfind, glocate, gxargs (g-prefixed)
brew install gnu-sed         # gsed

# ── Updated shells ────────────────────────────────────────────────────────────
# After installing, add the path to /etc/shells and run `chsh -s /opt/homebrew/bin/bash`
brew install bash
brew install bash-completion@2   # bash-completion v2 (supports dynamic completions)

# ── Core tools ────────────────────────────────────────────────────────────────
brew install wget
brew install vim
brew install nano
brew install grep
brew install openssh

# ── Jump / directory navigation ───────────────────────────────────────────────
brew install zoxide           # modern z replacement (z is the fallback)
# brew install z              # legacy fallback — uncomment if you prefer rupa/z

# ── Git ───────────────────────────────────────────────────────────────────────
brew install libgit2
brew install git
brew install gh               # GitHub CLI (also handles credential management)
brew install git-delta        # beautiful diffs (configured in .gitconfig)
brew install lazygit          # terminal git UI
brew install git-open         # open GitHub repos from the command line
brew install git-recent       # show recent branches

# ── Search / grep ─────────────────────────────────────────────────────────────
brew install ripgrep          # rg — fastest grep
brew install the_silver_searcher  # ag — also fast, different strengths
brew install fzf              # fuzzy finder (used in .functions log())

# ── ls enhancement ────────────────────────────────────────────────────────────
brew install eza              # modern ls replacement (maintained fork of exa)

# ── System monitoring ─────────────────────────────────────────────────────────
brew install htop
brew install ncdu             # disk usage navigator
brew install tldr             # simplified man pages

# ── Linting / static analysis ─────────────────────────────────────────────────
brew install shellcheck

# ── Media ─────────────────────────────────────────────────────────────────────
brew install imagemagick
brew install ffmpeg           # required by gifify / webmify in .functions.macos
# brew install gifsicle       # uncomment if you use gifify

# ── Misc CLI tools ────────────────────────────────────────────────────────────
brew install node             # installs npm too
brew install rename
brew install tree
brew install entr             # re-run a command when files change
brew install datamash
brew install xsv              # CSV toolkit
brew install pandoc           # universal document converter

# ── Bioinformatics / data science ─────────────────────────────────────────────
brew install r
brew install java
brew install samtools
brew install bcftools
brew install bedtools
brew install nextflow
brew install cromwell

# broadinstitute/dsp tap (cromshell — optional)
# brew tap broadinstitute/dsp && brew install cromshell

# ── Infrastructure / cloud ────────────────────────────────────────────────────
brew install kubectl
brew install awscli
brew install google-cloud-sdk

# ── Language runtimes ─────────────────────────────────────────────────────────
brew install automake cmake go

# Rust: use rustup, not Homebrew's formula
# curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# ── Python tooling ────────────────────────────────────────────────────────────
# uv is the preferred Python package/environment manager
brew install uv

# ── Final cleanup ─────────────────────────────────────────────────────────────
brew cleanup
