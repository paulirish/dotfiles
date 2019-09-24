#!/bin/bash

# set -eux

# check if gpg2 and pinentry-mac are installed
# CAUTHION overwriting ~/.oh

# generate gpg key and set it to git config
new_key_id=$(gpg --gen-key)

# set generated key to local gitconfig
git config --local gpg.program gpg
git config --local user.signingkey $(echo $new_key_id | awk '{ print substr($7, 25) }')

# restart gpg-agent
gpgconf --kill gpg-agent

