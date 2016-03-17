#!/bin/bash

# update devtools standalone repo
cd "$HOME/code/npm-publish-devtools-frontend" && ./update-github-mirror.sh

# prepare the locate database
LC_ALL=C /Users/paulirish/.homebrew/bin/gupdatedb --prunepaths="/tmp /var/tmp /.Spotlight-V100 /.fseventsd /Volumes/MobileBackups /Volumes/Volume /.MobileBackups"


