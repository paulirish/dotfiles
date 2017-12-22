#!/bin/bash
SCREENSHOT=/tmp/screenshot.png
LOCK_IMAGE=~/.config/i3/lock-screen.png

scrot $SCREENSHOT
convert $SCREENSHOT -blur 0x5 -scale 10% -scale 1000% $SCREENSHOT
convert $SCREENSHOT $LOCK_IMAGE -gravity center -composite -matte $SCREENSHOT

i3lock -i $SCREENSHOT -d -f
rm $SCREENSHOT

