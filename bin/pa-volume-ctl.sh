#!/bin/bash
# PulseAudio [up|down|mute] controls for default sink
# Updates: http://github.com/lidel/dotfiles/

getdefaultsinkname() {
    pacmd stat |
    awk -F": " '/^Default sink name: /{print $2}'
}

getdefaultsinkvol() {
    pacmd list-sinks |
    grep -A 10 "name: <$(getdefaultsinkname)>" |
    grep volume: |
    grep -m1 -o -E '[[:digit:]]+%' |
    sed 's/%//' --
}

case $1 in
    up)
        pactl set-sink-volume $(getdefaultsinkname) +2%
        ;;
    down)
        pactl set-sink-volume $(getdefaultsinkname) -2%
        ;;
    mute)
        pactl set-sink-mute   $(getdefaultsinkname) toggle
        ;;
    *)
        echo "Usage: `basename $0` [up|down|mute]"
        exit 1;;
esac

notify-send 'Volume' -t 200 -i audio-volume-medium-symbolic -h int:value:$(getdefaultsinkvol)