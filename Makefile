default: help

help:
	@echo 'available tasks:'
	@echo 'all               - install all the crap'
	@echo 'mac example:      PLATFORM=mac make all'
	@echo 'linux example:    PLATFORM=linux make all'

.PHONY: default all help

all:
ifndef PLATFORM
	@echo 'PLATFORM is not defined'
	@exit 1
endif
ifeq ($(PLATFORM), linux)
	$(MAKE) linux
endif
ifeq ($(PLATFORM), mac)
	$(MAKE) mac
endif

mac: intellij zshrc vim git tmux

linux: intellij bashrc vim git tmux

vim:
	cp -r .vim ~/
	cp .vimrc ~/
	git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
	wget -O ~/.vim/colors/molokai.vim https://raw.githubusercontent.com/tomasr/molokai/master/colors/molokai.vim

intellij:
	cp -r .ideavimrc ~/

zshrc:
	cp -r .zshrc ~/

bashrc:
	cp -r .bashrc ~/

tmux:
	cp -r .tmux.conf ~/

git:
	cp -r .gitconfig ~/

nvim:
	cp -r .config ~/

z:
	git clone git@github.com:rupa/z.git ~/z

