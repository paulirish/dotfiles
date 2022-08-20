#!/bin/bash
COMMAND=${1:-on}
RESOLUTION=${2:-1920x1080}

STANDARD_OUTPUT="eDP-1"
BEAMER_OUTPUT="DP-1"

# To detect all possible resolutions for DP1, connect the external Beamer or monitor with the
# notebook and enter xrandr in the console. Now you can choose one of the listed solutions
# and pass it as the second argument when calling this script
# example `toggle-beamer on 2560x1600`

echo "Use command ${COMMAND}"

if [ "${COMMAND}" == "on" ]; then
  echo "Turn output to beamer on..."
  xrandr --output $BEAMER_OUTPUT --mode ${RESOLUTION} --right-of $STANDARD_OUTPUT
else
  echo "Turn output to beamer off..."
  xrandr --output $BEAMER_OUTPUT --off
fi
