#!/bin/bash

# `crontab -l` sez this runs TWICE daily.. at 2pm and 8pm

cd "$HOME/code/npm-publish-devtools-frontend" && ./update-github-mirror.sh && ./publish-devtools-package-to-npm.sh


