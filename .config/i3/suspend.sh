#!/bin/bash

. ~/.config/i3/create-lock-image.sh

SCREENSHOT="/tmp/screenshot.png"

createLockImage $SCREENSHOT

i3lock -i $SCREENSHOT -f && dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 \
    "org.freedesktop.login1.Manager.Suspend" boolean:true

rm $SCREENSHOT
