#!/bin/bash

set -eu
# set -x

# Install command-line tools using Homebrew

# Make sure we’re using the latest Homebrew
brew update

# Upgrade any already-installed formulae
brew upgrade


# GNU core utilities (those that come with OS X are outdated)
brew install coreutils
brew install moreutils
# GNU `find`, `locate`, `updatedb`, and `xargs`, `g`-prefixed
brew install findutils
# GNU `sed`, overwriting the built-in `sed`
brew install gnu-sed --with-default-names


# Bash 4
# Note: don’t forget to add `/usr/local/bin/bash` to `/etc/shells` before running `chsh`.
brew install bash
if ! fgrep -q "/usr/local/bin/bash" /etc/shells; then
    echo "/usr/local/bin/bash" | sudo tee -a /etc/shells
    chsh -s "/usr/local/bin/bash"
fi

brew install bash-completion

brew install homebrew/completions/brew-cask-completion

# Install wget with IRI support
brew install wget --with-iri

# Install more recent versions of some OS X tools
brew install vim --with-override-system-vi
brew install homebrew/dupes/nano
brew install homebrew/dupes/grep
brew install homebrew/dupes/openssh
brew install homebrew/dupes/screen

# z hopping around folders
brew install z

# run this script when this file changes guy.
brew install entr

# github util. gotta love `hub fork`, `hub create`, `hub checkout <PRurl>`
brew install hub


# mtr - ping & traceroute. best.
brew install mtr

    # allow mtr to run without sudo
    mtrlocation=$(brew info mtr | grep Cellar | sed -e 's/ (.*//') #  e.g. `/Users/paulirish/.homebrew/Cellar/mtr/0.86`
    sudo chmod 4755 $mtrlocation/sbin/mtr
    sudo chown root $mtrlocation/sbin/mtr


# Install other useful binaries
brew install the_silver_searcher
brew install fzf

$(which git) && mv "$(which git)" "$(which-git)-bak"
brew install git &&
    brew link --force git
brew install gpg2 &&
brew install pinentry-mac &&
    echo "pinentry-program /usr/local/bin/pinentry-mac" > ~/.gnupg/gpg-agent.conf
brew install cmake
brew install docker
brew install kubectl && brew link --overwrite kubernetes-cli
brew install mysql
brew install anyenv && eval "$(anyenv init -)" && echo 'eval "$(anyenv init -)"' → "${HOME}/.bash_profile"
brew install jq
brew install imagemagick --with-webp
brew install pv
brew install rename
brew install tree
brew install zopfli
brew install ffmpeg --with-libvpx

brew install terminal-notifier

brew install android-platform-tools
brew install pidcat   # colored logcat guy

brew install ncdu # find where your diskspace went

# Remove outdated versions from the cellar
brew cleanup
