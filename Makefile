help:
	@echo 'available tasks:'
	@echo 'all               - install all the crap'
	@echo 'mac example:      PLATFORM=mac make all'
	@echo 'linux example:    PLATFORM=linux make all'

.PHONY: default
default: help

.PHONY: all
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

.PHONY: mac
mac: intellij zshrc vim git tmux

.PHONY: linux
linux: intellij bashrc git tmux

.PHONY: vim
vim:
	cp -r .vim ~/
	cp .vimrc ~/
	git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
	wget -O ~/.vim/colors/molokai.vim https://raw.githubusercontent.com/tomasr/molokai/master/colors/molokai.vim

.PHONY: intellij
intellij:
	cp -r .ideavimrc ~/

.PHONY: zshrc
zshrc:
	cp -r .zshrc ~/

.PHONY: bash
bashrc:
	cp -r .bashrc ~/

.PHONY: tmux
tmux:
	cp -r .tmux.conf ~/

.PHONY: git
git:
	cp -r .gitconfig ~/

.PHONY: nvim
nvim:
	cp -r .config ~/
