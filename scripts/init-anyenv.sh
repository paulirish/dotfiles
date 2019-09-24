#!/bin/bash

set -eu
# set -x

$(brew list | grep -q anyenv) || (echo 'run "brew install anyenv" before running this script' 1>&2 && exit 1)

echo 'appending init command for anyenv to ${HOME}/.bash_profile' && echo 'eval "$(anyenv init -)"' >> "${HOME}/.bash_profile"

[ -d "${HOME}/.config/anyenv/anyenv-install" ] || anyenv install --init
anyenv install rbenv
anyenv install nodenv

echo 'executing "exec $SHELL -l"' && exec $SHELL -l

