#!/bin/bash

# `crontab -l` sez this runs every hour on the hour

PATH=/Users/paulirish/.homebrew/bin:/Users/paulirish/.homebrew/sbin:/Users/paulirish/code/depot_tools:$PATH

local_script_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# https://github.com/ChromeDevTools/devtools-protocol
cd $local_script_path &&  ./update-protocol-repo.sh

# https://github.com/ChromeDevTools/devtools-frontend
cd "$HOME/code/npm-publish-devtools-frontend" && ./update-github-mirror.sh


