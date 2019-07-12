#!/bin/bash

# `crontab -l` sez this runs every hour on the hour

set -x

PATH=/Users/paulirish/bin:/Users/paulirish/.homebrew/bin:/Users/paulirish/.homebrew/sbin:/Users/paulirish/code/depot_tools:$PATH

local_script_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


which node
node --version

# https://github.com/ChromeDevTools/devtools-protocol
cd "$HOME/code/pristine/devtools-protocol/scripts" && ./update-to-latest.sh
cd "$HOME/code/pristine/devtools-protocol/scripts" && ./update-n-publish-docs.sh

# https://github.com/ChromeDevTools/devtools-frontend
cd "$HOME/code/npm-publish-devtools-frontend" && ./update-github-mirror.sh


# this was an attempt but it failed.
# i tried to make the chromium watch faster, but this just hangs there for a WHILE and doesnt return. dunno why its different running in the hook...

nstime=$(gdate +%s)
git_work_tree="/Users/paulirish/chromium/src"

read -r -d '' watchargs << EOM
	["query", "$git_work_tree", { \
		"since": $nstime,\
		"fields": ["name"],\
		"expression": ["not", ["allof", ["since", $nstime, "cclock"], ["not", "exists"]]]
	}]
EOM

watchman -j $watchargs