#!/bin/bash

# set -x

mode="${1:-on}"
monitor_name="${2:-eDP-1}"
scale="${3:-2}"

if [[ "$mode" == "on" ]]; then
  hyprctl keyword monitor DP-1,preferred,auto,${scale},mirror,${monitor_name}
else
  hyprctl keyword monitor DP-1,preferred,auto,${scale}
fi
