#!/bin/bash

if playerctl status &>/dev/null
then
  STATUS=`playerctl status`
  if [ "$STATUS" == "Playing" ]
  then
    ARTIST=`playerctl metadata artist`
    TITLE=`playerctl metadata title`
    echo "$ARTIST - $TITLE"
    echo $TITLE
    exit 0
  fi
fi
if mpc status &>/dev/null
then
  STATUS=`mpc status`
  if [[ "$STATUS" == *"[playing]"* ]]
  then
    echo `mpc current`
    echo `mpc current -f "%title%"`
    exit 0
  fi
fi
