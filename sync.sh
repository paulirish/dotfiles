#!/bin/bash
help="
This script helps you out installing dotfiles locally

usage: ./sync [-options]

Where options can be:
  -f     forces the installation
  -y     confirm rsync to your root directory
"

while getopts "hy" opt; do
  case $opt in
    h)
      echo "$help">&2
      exit
      ;;
    y)
      yes=true
      ;;
    *)
      echo "$help">&2
      exit
      ;;
  esac
done

if [ $OPTIND -eq 1 ]; then
  echo "$help">&2
  exit
fi

cd "$(dirname "$0")"

if [ ! -d $HOME/.vim/bundle/Vundle.vim ]; then
  git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
fi

rsync --exlude ".gitignore" --exlude ".gitmodules" --exclude "install-deps.sh" --exclude ".git/" --exclude ".DS_Store" --exclude "sync.sh" --exclude "README.md" -av . ~
source ~/.bash_profile
