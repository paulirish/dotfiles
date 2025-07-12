#!/usr/bin/env bash
# TODO: combine this file with brew.sh

# to maintain cask ....
#     brew update && brew cleanup


# Install native apps

# Get access to Mac App Store
brew install mas

# daily
brew install --cask 1password 1password-cli # credential management
brew install --cask rescuetime # time tracking
brew install --cask mathpix-snipping-tool # for auto latex generation and OCR
brew install --cask google-chrome
brew install --cask skim # papers
brew install --cask raycast # better spotlight
brew install --cask cursor # better vscode
brew install --cask iterm2
brew install --cask chatgpt 

# music
brew install --cask spotify
brew install --cask rekordbox
brew install --cask soulseek

# communication
brew install --cask slack 
brew install --cask discord
brew install --cask zoom
brew install --cask whatsapp
mas install 1176895641 # Spark email client

# cloud storage / backups
brew install rclone
brew install awscli
brew install google-cloud-sdk
brew install --cask rcloneosx
brew install --cask google-drive 
brew install --cask dropbox

# dev / bio
brew install --cask imageoptim # image compression
brew install --cask imagej fiji # microscopy image stuff
brew install --cask xquartz 
brew install --cask docker # containers!
