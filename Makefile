help:
	@echo 'available tasks:'
	@echo 'all               - install all the crap'

default: help

all: intellij zshrc vim git nvim

vim:
	cp -r .vim ~/
	cp .vimrc ~/
	git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
	wget -O ~/.vim/colors/molokai.vim https://raw.githubusercontent.com/tomasr/molokai/master/colors/molokai.vim

intellij:
	cp -r .ideavimrc ~/

zshrc:
	cp -r .zshrc ~/

tmux:
	cp -r .tmux.conf ~/

git:
	cp -r .gitconfig ~/

nvim:
	cp -r .config ~/

