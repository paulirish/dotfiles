#!/bin/sh

function createlink {
	source_file=$1

	target_file="$HOME/$source_file"

	if [[ -f $target_file ]]; then
		rm $target_file
	fi

	ln -s $source_file $target_file
}

createlink ".extra"
createlink ".bash_prompt"
createlink ".exports"
createlink ".aliases"
createlink ".functions"
createlink ".bash_profile"
createlink ".gitconfig"
createlink ".gitignore"
createlink ".bashrc"
createlink ".viminfo"
createlink ".zshrc"