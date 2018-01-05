#!/bin/bash

revert() {
  xset +dpms dpms 0 0 0
}

SCREENSHOT=/tmp/screenshot.png
LOCK_IMAGE=~/.config/i3/lock-screen.png

scrot $SCREENSHOT
convert $SCREENSHOT -blur 0x5 -scale 10% -scale 1000% $SCREENSHOT
convert $SCREENSHOT $LOCK_IMAGE -gravity center -composite -matte $SCREENSHOT

trap revert HUP INT TERM
xset +dpms dpms 5 5 5

i3lock -i $SCREENSHOT -f
rm $SCREENSHOT

revert

