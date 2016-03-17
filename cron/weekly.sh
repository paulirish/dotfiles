#!/bin/bash


# protocol viewer
cd $HOME/code/debugger-protocol-viewer && ./update-protocol-json.sh && git commit -am "bump protocol" && git pull && git push
