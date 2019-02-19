#!/bin/bash


# to maintain cask ....
#     brew update && brew upgrade brew-cask && brew cleanup && brew cask cleanup`


# Additional apps versions
brew tap caskroom/versions

# daily
brew cask install spectacle
# brew cask install gyazo
# brew cask install rescuetime
# brew cask install nordvpn
# brew cask install flux

# dev
brew cask install iterm2
brew cask install hyper
brew cask install visual-studio-code
brew cask install atom
brew cask install imagealpha
brew cask install imageoptim
brew cask install charles
brew cask install sequel-pro
brew cask install psequel
brew cask install slack
brew cask install docker
brew cask install android-sdk
brew cask install android-platform-tools
# brew cask install java

# fun
# brew cask install limechat
# brew cask install miro-video-converter
# brew cask install horndis               # usb tethering

# browsers
brew cask install google-chrome
brew cask install google-chrome-canary
brew cask install tor-browser
brew cask install firefox-nightly
# brew cask install webkit-nightly
# brew cask install chromium

# less often
# brew cask install disk-inventory-x
# brew cask install screenflow
brew cask install vlc
# brew cask install licecap
brew cask install transmission
brew tap caskroom/fonts
brew cask install font-fira-code
brew cask install font-hack-nerd-font
