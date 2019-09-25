#!/bin/bash

# set gpg key to gitconfig
# install gnupg and pinentry-mac before running this script

set -eu
# set -x

# check if gpg2 and pinentry-mac are installed
brew list | awk '/gnupg/ && /pinentry-mac/' ||
    (echo 'run "brew install gnupg pinentry-mac"' && exit 1)

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
        read -rp 'Type 16-digit key ID to use existing key or type "c" to create: '
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

# set generated key to local gitconfig
git config --local gpg.program gpg
git config --local user.signingkey "$gpg_long_key_id"

# restart gpg-agent
gpgconf --kill gpg-agent

