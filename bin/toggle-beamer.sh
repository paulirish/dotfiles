#!/bin/bash
COMMAND=${1:-on}
SCALE=${2:-2}

STANDARD_OUTPUT="eDP-1"
BEAMER_OUTPUT="DP-1"

# To detect all possible resolutions for DP1, connect the external Beamer or monitor with the
# notebook and enter xrandr in the console. Now you can choose one of the listed solutions
# and pass it as the second argument when calling this script
# example `toggle-beamer on 2560x1600`

echo "Use command ${COMMAND}"

if [ "${COMMAND}" == "on" ]; then
  echo "Turn output to beamer on..."
  hyprctl keyword monitor $BEAMER_OUTPUT},preferred,auto,${SCALE},mirror,${STANDARD_OUTPUT}
  # xrandr --output $BEAMER_OUTPUT --mode ${RESOLUTION} --right-of $STANDARD_OUTPUT
else
  echo "Turn output to beamer off..."
  hyprctl keyword monitor $BEAMER_OUTPUT},disable
  # xrandr --output $BEAMER_OUTPUT --off
fi
