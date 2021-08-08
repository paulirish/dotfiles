#!/bin/bash


# to maintain cask ....
#     brew update && brew cleanup


# Install native apps

# daily
brew install --cask 1password 1password-cli
brew install --cask rescuetime # time tracking
brew install --cask mathpix-snipping-tool # for auto latex generation and OCR
brew install --cask google-chrome
brew install --cask slack  # communication
brew install --cask discord
brew install --cask zotero skim # papers
brew install --cask alfred # system searching
brew install --cask spotify

# torrent
brew install --cask transmission

# cloud storage
brew install --cask google-drive google-drive-file-stream
brew install --cask dropbox

# dev / bio
brew install --cask iterm2
brew install --cask sublime-text visual-studio-code # editors
brew install --cask imageoptim # image compression
brew install --cask rstudio # IDE
brew install --cask imagej fiji # microscopy image stuff
brew install --cask docker # containers!
# Add conda??

# less frequently used things
brew install --cask screenflow # for screen recording
brew install --cask vlc

# Spacemacs
brew tap d12frosted/emacs-plus
brew install emacs-plus@28 --with-spacemacs-icon
brew link emacs-plus
git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d

# Mac App Store
brew install mas
mas install 1176895641 # Spark email client
mas install 441258766 # Magnet for window control
mas install 1482454543 # Twitter

# Fonts
brew tap homebrew/cask-fonts
brew install --cask font-fira-code font-source-code-pro
