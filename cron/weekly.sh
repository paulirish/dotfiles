#!/bin/bash


PATH=/Users/paulirish/.homebrew/bin:/Users/paulirish/.homebrew/sbin:/Users/paulirish/code/depot_tools:$PATH


# protocol viewer
cd $HOME/code/debugger-protocol-viewer && git checkout gh-pages && ./update-protocol-json.sh && git commit -am "bump protocol"
cd $HOME/code/debugger-protocol-viewer && git pull && git push
