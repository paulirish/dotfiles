#!/bin/bash


# to maintain cask ....
#     brew update && brew upgrade brew-cask && brew cleanup && brew cask cleanup`


# Install native apps

brew install caskroom/cask/brew-cask
# brew tap caskroom/versions

# daily
brew cask install spectacle
brew cask install dropbox
brew cask install gyazo
brew cask install 1password
brew cask install rescuetime
brew cask install kindle
brew cask install uhk-agent
brew cask install spotify

# dev
brew cask install iterm2
brew cask install visual-studio-code
brew cask install imagealpha
brew cask install imageoptim
brew cask install docker
brew cask install tunnelblick
# only the installer
brew cask install adobe-creative-cloud

# browsers
brew cask install google-chrome
brew cask install firefox

# less often
brew cask install disk-inventory-x
# brew cask install screenflow
brew cask install vlc
brew cask install gpgtools
# brew cask install utorrent
# brew cask install miro-video-converter

brew tap caskroom/fonts 
brew cask install font-fira-code


# Not on cask but I want regardless.

# File Multi Tool 5
# Phosphor
