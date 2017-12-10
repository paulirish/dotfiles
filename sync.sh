#!/bin/bash
cd "$(dirname "$0")"
git pull

copyFiles() {
  rsync --exclude ".git/" --exclude ".DS_Store" --exclude "sync.sh" --exclude "README.md" --exclude "iTerm2" --exclude "terminal" --exclude "install-deps.sh" --exclude "readme.md" --exclude "createlinks.sh" -av . ~
}

copyFiles

# Rename i3 configs
mv ~/.config/i3/config-${HOSTNAME} ~/.config/i3/config
mv ~/.config/i3/i3status-${HOSTNAME}.conf ~/.config/i3/i3status.conf
