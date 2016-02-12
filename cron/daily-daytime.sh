#!/bin/bash

# `crontab -l` sez this runs TWICE daily.. at 2pm and 8pm

cd "$HOME/code/npm-publish-devtools-frontend" && ./pull.sh && ./publish.sh

cd $HOME/code/debugger-protocol-viewer && ./update-protocol-json.sh && git commit -am "bump protocol" && git pull && git push
