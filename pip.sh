#!/usr/bin/env bash

# Install Python command-line tools.

# Ask for the administrator password upfront.
sudo -v

# Keep-alive: update existing `sudo` time stamp until the script has finished.
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

pip install -U pip
pip install pipenv
pip install setuptools
pip install virtualenv
pip install virtualenv-clone
pip install virtualenvwrapper
