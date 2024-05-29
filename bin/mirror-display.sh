#!/bin/bash

# set -x

mode="${1:-on}"
monitor_name="${2:-DP-1}"
scale="${3:-auto}"

internal_monitor="eDP-1"

echo "Mirror to $monitor_name"

if [[ "$mode" == "on" ]]; then
  hyprctl keyword monitor ${monitor_name},preferred,auto,${scale},mirror,${internal_monitor}
else
  hyprctl keyword monitor ${monitor_name},preferred,auto,${scale}
fi
