#! /bin/bash

# go to https://github.com/carlhuda/janus and install janus

read -p "Did you installed janus already? (Y/N)" -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo 'creating ~./janus directory'
  cd ~/
  mkdir .janus
  cd .janus
  git clone https://github.com/terryma/vim-multiple-cursors.git
  git clone https://github.com/bling/vim-airline
  git clone https://github.com/mustache/vim-mustache-handlebars.git
  git clone https://github.com/MattesGroeger/vim-bookmarks
  git clone https://github.com/Shougo/unite.vim
  git clone https://github.com/JarrodCTaylor/vim-js2coffee.git
  cp _vimrc.after ~/.vimrc.after
else
  echo 'Please got to https://github.com/carlhuda/janus'
fi
