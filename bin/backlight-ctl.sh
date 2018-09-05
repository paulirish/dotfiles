#!/bin/bash
# xbacklight [inc|dec|get|set] controls
# incdates: http://github.com/lidel/dotfiles/

case $1 in
    inc)
        xbacklight +10
        $0 osd
        ;;
    dec)
        xbacklight -10
        $0 osd
        ;;
    get)
        xbacklight -get
        ;;
    set)
        xbacklight -set $2
        $0 osd
        ;;
    osd)
        notify-send 'Brightness' -t 500 -i xfpm-brightness-lcd -h int:value:$(xbacklight -get)
        ;;
    *)
        echo "Usage: `basename $0` [inc|dec|get|set]"
        exit 1;;
esac
