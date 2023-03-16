#!/bin/bash
cd "$(dirname "$0")"
git pull

# recompile VIM German spell file
nvim -e -s -c "mkspell! ~/Projects/dotfiles/.config/nvim/spell/de.utf-8.add" -c qa

copyFiles() {
  rsync --exclude ".git/" --exclude "sync.sh" --exclude "README.md" --exclude "terminal" --exclude "readme.md" -av . ~
}

copyFiles

HOST_NAME=$(hostname)

# Rename i3 configs
if [ -f ~/.config/i3/config_${HOST_NAME} ]; then
  mv ~/.config/i3/config_${HOST_NAME} ~/.config/i3/config
fi

IS_I3_RUNNING=$(ps aux | grep i3 | grep -v grep)
if [ -n "${IS_I3_RUNNING}" ]; then
  i3-msg reload
fi
