#!/bin/bash
cd "$(dirname "$0")"
git pull

function copyFiles() {
  rsync --exclude ".git/" --exclude ".DS_Store" --exclude "sync.sh" --exclude "README.md" --exclude "iTerm2" --exclude "terminal" --exclude "install-deps.sh" --exclude "readme.md" --exclude "createlinks.sh" -av . ~
}

copyFiles
