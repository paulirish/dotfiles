#!/usr/bin/env bash

# Install command-line tools using npm.

# Ask for the administrator password upfront.
sudo -v

# Keep-alive: update existing `sudo` time stamp until the script has finished.
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

npm install --global git-open
npm install --global jwt-cli
