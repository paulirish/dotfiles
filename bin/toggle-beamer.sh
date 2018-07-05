#!/bin/bash
COMMAND=${1:-on}

echo "Use command ${COMMAND}"

if [ "${COMMAND}" == "on" ]; then
  echo "Turn output to beamer on..."
  xrandr --output DP1 --mode 1920x1080 --above eDP1
else
  echo "Turn output to beamer off..."
  xrandr --output DP1 --off
fi
