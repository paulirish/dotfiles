#!/bin/bash
cd "$(dirname "$0")"
git pull

copyFiles() {
  rsync --exclude ".git/" --exclude "sync.sh" --exclude "README.md" --exclude "terminal" --exclude "readme.md" -av . ~
}

copyFiles

HOST_NAME=$(cat /etc/hostname)

# Rename i3 configs
if [ -f ~/.config/i3/config-${HOST_NAME} ]; then
  mv ~/.config/i3/config-${HOST_NAME} ~/.config/i3/config
  mv ~/.config/i3/i3status-${HOST_NAME}.conf ~/.config/i3/i3status.conf
fi

IS_I3_RUNNING=$(ps aux | grep i3 | grep -v grep)
if [ -n "${IS_I3_RUNNING}" ]; then
  i3-msg reload
fi

