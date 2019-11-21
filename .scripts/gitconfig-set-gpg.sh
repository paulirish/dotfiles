#!/bin/bash

# What this does:
# Create a new GPG key or use an existing key
# Set the key to gitconfig in the currenty repository

# Usage:
# To create a new key and set it:
# 1. ./git-set-gpg-key.sh
# 2. Type "c"
# 3. Enter your name and git email address
# 4. The public key will be copied to the clipboard
# 5. Paste it anywhere like https://github.com/settings/gpg/new

# To set an existing key:
# 1. ./git-set-gpg-key.sh
# 2. A list of keys shows up
# 3. Type an existing key ID (e.g. "464000EF49324FA9" in rsa2048/464000EF49324FA9)
# 4. The public key will be copied to the clipboard
# 5. Paste it anywhere like https://github.com/settings/gpg/new

# Notes:
# Install gnupg and pinentry-mac before running this script

set -eu
# set -x

# check if gpg2 and pinentry-mac are installed
brew list --full-name gnupg2 pinentry-mac > /dev/null ||
    (echo 'run brew install gnupg pinentry-mac && echo "pinentry-program /usr/local/bin/pinentry-mac" > ~/.gnupg/gpg-agent.conf' && exit 1)

# create a new gpg key and return the 16-digit key ID
function get_new_gpg_key_id() {
  # generate gpg key
  local new_key_id=$(gpg --gen-key)
  # echo 16-digit key ID
  echo $new_key_id | awk '{ print substr($7, 25) }'
}

# initialize var REPLY which is the default var for read command
REPLY=''

# list all gpg keys
if gpg --keyid-format long --list-keys; then
    while true; do
        # ask whether using existing key or creating new one
        # redirection from /dev/tty is needed since this script is called from Githooks
        read -rp 'Type 16-digit key ID to use existing key or type "c" to create: ' < /dev/tty
        # create
        if [[ $REPLY =~ ^[[:space:]]*(create|c)[[:space:]]*$ ]]; then
            gpg_long_key_id=$(get_new_gpg_key_id)
            break
        fi
        # use existing
        # validate digits and check if it exists
        if [[ $REPLY =~ ^[[:space:]]*[0-9A-Z]{16}[[:space:]]*$ ]] && gpg --keyid-format long --list-keys "$REPLY"; then
            gpg_long_key_id="$REPLY"
            break
        fi
    done
else
    gpg_long_key_id=$(get_new_gpg_key_id)
fi

# set the key info to local gitconfig if the current directory is a git repo
if git tag > /dev/null 2>&1; then 
  echo "Setting the key info to `git rev-parse --show-toplevel`/.git/config"
  git config --local gpg.program gpg
  git config --local user.signingkey "$gpg_long_key_id"
fi

# restart gpg-agent
gpgconf --kill gpg-agent

# copy the public key to your clipboard
(gpg --armor --export "$gpg_long_key_id" | pbcopy) && printf 'Copied the public key to your clipboard.\nPlease paste it to a place like https://github.com/settings/gpg/new\n'
