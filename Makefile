help:
	@echo 'available tasks:'
	@echo 'cp               - copy all files to home directory'

default: help

cp:
	cp -r ./.config ~/
	cp -r ./.gitconfig ~/
	cp -r ./.ideavimrc ~/
	cp -r ./.tmux.conf ~/
	cp -r ./.vimrc ~/
	cp -r ./.zshrc ~/

install:
	mkdir -p ~/.vim/bundle
	git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim

