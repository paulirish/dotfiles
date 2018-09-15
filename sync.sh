#!/bin/bash
cd "$(dirname "$0")"
git pull

copyFiles() {
  rsync --exclude ".git/" --exclude --exclude "sync.sh" --exclude "README.md" --exclude "terminal" --exclude "readme.md" -av . ~
}

copyFiles

# Rename i3 configs
if [ -f ~/.config/i3/config-${HOSTNAME} ]; then
  mv ~/.config/i3/config-${HOSTNAME} ~/.config/i3/config
  mv ~/.config/i3/i3status-${HOSTNAME}.conf ~/.config/i3/i3status.conf
fi

i3-msg reload
