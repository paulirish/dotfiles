#!/bin/sh
xrandr --output HDMI-0 --mode 2560x1440 --pos 3840x0 --rotate normal --scale 2x2 --output DP-2 --mode 3840x2160 --pos 0x0 --rotate normal --output DP-1 --off --output DP-0 --off
dt=`date`
echo "${dt}ran xrandr" >> /tmp/xrandrlog
