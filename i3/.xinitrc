#!/bin/bash

if [ -d /etc/X11/xinit/xinitrc.d ]; then
    for f in /etc/X11/xinit/xinitrc.d/*; do
        [ -x "$f" ] && . "$f"
    done
    unset f
fi

xrdb -merge .Xresources


xmodmap -e "pointer = 3 2 1"
	

exec i3 -V -d all >~/log/i3log-$(date +'%F-%k-%M-%S') 2>&1
