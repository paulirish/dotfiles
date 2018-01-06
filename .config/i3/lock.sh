#!/bin/bash

. ~/.config/i3/create-lock-image.sh

SCREENSHOT="/tmp/screenshot.png"
TIME=10

revert() {
  xset dpms 0 0 0
}

createLockImage $SCREENSHOT

xset +dpms dpms $TIME $TIME $TIME

i3lock -n -i $SCREENSHOT -f

rm $SCREENSHOT

revert

