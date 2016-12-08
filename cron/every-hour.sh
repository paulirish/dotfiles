#!/bin/bash

# `crontab -l` sez this runs every hour on the hour

PATH=/Users/paulirish/.homebrew/bin:/Users/paulirish/.homebrew/sbin:/Users/paulirish/code/depot_tools:$PATH


cd "$HOME/code/npm-publish-devtools-frontend" && ./update-github-mirror.sh


