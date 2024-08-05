#!/bin/bash

# Install command-line tools using Homebrew

# (Optionally) Turn off brew's analytics https://docs.brew.sh/Analytics
# brew analytics off


# GNU core utilities (those that come with OS X are outdated)
brew install coreutils
brew install moreutils
# GNU `find`, `locate`, `updatedb`, and `xargs`, `g`-prefixed
brew install findutils
# GNU `sed`
brew install gnu-sed


# Updated shells
# Note: don’t forget to add `/usr/local/bin/<EACHSHELL>` to `/etc/shells` before running `chsh`.
brew install fish

brew install bash-completion


# Install wget
brew install wget

# Install more recent versions of some OS X tools
brew install vim
brew install nano
brew install grep

# z hopping around folders
brew install z

# run this script when this file changes guy.
brew install entr

# github util
brew install gh
# nicer git diffs
brew install git-delta

# better `top`
brew install glances

brew install shellcheck # linting for .sh files


# mtr - ping & traceroute. best.
brew install mtr
   # `abbr mtr "sudo mtr"` to avoid forgetting.

# Install other useful binaries
brew install the_silver_searcher # ack is an alternative, tbh i forget which i like more.
brew install fzf

brew install imagemagick
brew install node # This installs `npm` too using the recommended installation method
brew install rename
brew install tree
brew install ffmpeg

# json stuff
brew install jq gron

# brew install ncdu # find where your diskspace went
brew install gdu # available as gdu-go. faster than ncdu on SSD's.


brew install scrcpy # control/view android phone from PC. amazing
brew install youtube-dl

