#!/bin/bash
set -e

num=`i3-msg -t get_workspaces | jq 'map(select(.focused == true))[0].num'`
i3-input -F "rename workspace to \"$num:%s\"" -P 'New name: '

name=`i3-msg -t get_workspaces | jq 'map(select(.focused == true))[0].name'`
# If empty name was set
if [[ "$name" =~ ^\"[0-9]+:\"$ ]]
then
  # Remove trailing colon and whitespace
  i3-msg "rename workspace to \"$num\""
fi
