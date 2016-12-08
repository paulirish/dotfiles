#!/bin/bash

# `crontab -l` sez this runs TWICE daily.. at 2pm and 8pm


PATH=/Users/paulirish/.homebrew/bin:/Users/paulirish/.homebrew/sbin:/Users/paulirish/code/depot_tools:$PATH


cd "$HOME/code/npm-publish-devtools-frontend" && ./update-github-mirror.sh


