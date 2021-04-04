#!/bin/bash


# to maintain cask ....
#     brew update && brew upgrade brew-cask && brew cleanup && brew cask cleanup`


# Additional apps versions
brew tap homebrew/cask-versions

# daily
brew install --cask spectacle
# brew install --cask gyazo
# brew install --cask rescuetime
# brew install --cask nordvpn
# brew install --cask flux

# dev
brew install --cask iterm2
brew install --cask hyper
brew install --cask visual-studio-code
brew install --cask atom
brew install --cask imagealpha
brew install --cask imageoptim
brew install --cask charles
brew install --cask sequel-pro
brew install --cask slack
brew install --cask docker
brew install --cask android-sdk
brew install --cask android-platform-tools
# brew install --cask java

# fun
# brew install --cask limechat
# brew install --cask miro-video-converter
# brew install --cask horndis               # usb tethering

# browsers
brew install --cask google-chrome
brew install --cask google-chrome-canary
brew install --cask tor-browser
brew install --cask firefox-nightly
# brew install --cask webkit-nightly
# brew install --cask chromium

# less often
# brew install --cask disk-inventory-x
# brew install --cask screenflow
brew install --cask vlc
# brew install --cask licecap
brew tap homebrew/cask-fonts
brew install --cask font-fira-code
brew install --cask font-hack-nerd-font
