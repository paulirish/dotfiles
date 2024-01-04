#!/bin/bash

# set -x

result=$(hyprctl monitors | grep -Eo ".*eDP-1.*")

if [ -z "$result" ]; then
  hyprctl keyword monitor eDP-1,preferred,auto,auto
else
  hyprctl keyword monitor eDP-1,disable
fi

