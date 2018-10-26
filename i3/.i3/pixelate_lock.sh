#!/bin/bash
set -e

scrot /tmp/screen.png
convert /tmp/screen.png -scale 10% -scale 1000% /tmp/screen.png
[[ -f ~/.i3/lock-icon.png ]] && convert /tmp/screen.png ~/.i3/lock-icon.png -gravity center -composite -matte /tmp/screen.png
i3lock -u -i /tmp/screen.png
