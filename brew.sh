#!/usr/bin/env bash

# Install command-line tools and apps using Homebrew, and mas

# (Optionally) Turn off brew's analytics https://docs.brew.sh/Analytics
# brew analytics off

# Make sure we’re using the latest Homebrew
brew update

# Upgrade any already-installed formulae
brew upgrade

# GNU core utilities (those that come with OS X are outdated)
brew install coreutils
brew install moreutils
# GNU `find`, `locate`, `updatedb`, and `xargs`, `g`-prefixed
brew install findutils
# GNU `sed`
brew install gnu-sed

# Updated shells
# Note: don’t forget to add `/usr/local/bin/<EACHSHELL>` to `/etc/shells` before running `chsh`.
brew install bash
brew install bash-completion

# Install wget
brew install wget

# Install more recent versions of some OS X tools
brew install vim
brew install nano
brew install grep
brew install openssh

# z hopping around folders
brew install z

# run this script when this file changes guy.
brew install entr

# git stuff
brew install libgit2
brew install git
brew install gh # github cli
brew install git-delta # nicer git diffs
brew install lazygit # easy git gui
brew install git-open # open github repos from the command line
brew install git-recent # see recent branches

# better `top`
brew install htop

# linting for .sh files
brew install shellcheck 

# Install other useful binaries
brew install ripgrep # fastest grep (shortcut = rg)
brew install the_silver_searcher # ack is an alternative, tbh i forget which i like more.
brew install fzf
brew install imagemagick
brew install node # This installs `npm` too using the recommended installation method
brew install rename
brew install tree
brew install zopfli
brew install ffmpeg
brew install ncdu # find where your diskspace went
brew install tldr
brew install watchman
brew install trash-cli
brew install datamash
brew install xsv
brew install freetype mysql # for cellprofiler

# citations
brew install pandoc

# bioinfo / data science
brew install cookiecutter
brew tap brewsci/bio
brew install r
brew install java
brew install igv
brew install samtools
brew install bcftools
brew install bedtools
brew install brewsci/bio/nextflow
brew install broadinstitute/dsp/cromshell
brew install cromwell
brew install kubectl

# will probably need these at some point
brew install automake cmake go rust mysql

# Remove outdated versions from the cellar
brew cleanup
