#!/usr/bin/env bash

# Install Python command-line tools.

# Ask for the administrator password upfront.
sudo -v

# Keep-alive: update existing `sudo` time stamp until the script has finished.
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

pip install virtualenv
pip install virtualenvwrapper
