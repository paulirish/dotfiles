#!/bin/bash
cd "$(dirname "$0")"
git pull
function doIt() {
  rsync --exclude ".git/" --exclude ".DS_Store" --exclude "sync.sh" --exclude "README.md" --exclude "iTerm2" --exclude "terminal" --exclude "install-deps.sh" --exclude "readme.md" --exclude "createlinks.sh" -av . ~
}
if [ "$1" == "--force" -o "$1" == "-f" ]; then
	doIt
else
	read -p "This may overwrite existing files in your home directory. Are you sure? (y/n) " -n 1
	echo
	if [[ $REPLY =~ ^[Yy]$ ]]; then
		doIt
	fi
fi
unset doIt
source ~/.bash_profile
