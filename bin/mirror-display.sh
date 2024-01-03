#!/bin/bash

# set -x

mode="${1:-on}"
scale="${2:-2}"

if [[ "$mode" == "on" ]]; then
  hyprctl keyword monitor DP-1,preferred,auto,${scale},mirror,eDP-1
else
  hyprctl keyword monitor DP-1,preferred,auto,${scale}
fi
