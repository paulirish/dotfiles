#!/bin/bash

LAST_COMMAND_FILE=/tmp/i3_music_keys_last_command
case $1 in
   "toggle")
       PLAYERCTL_COMMAND="play-pause"
       ;;
   "stop")
       PLAYERCTL_COMMAND="stop"
       ;;
   "next")
       PLAYERCTL_COMMAND="next"
       ;;
   "prev")
       PLAYERCTL_COMMAND="previous"
       ;;
   *)
       echo "Usage: $0 toggle|stop|next|prev"
       exit 1
        ;;
esac
MPC_COMMAND=$1

function is_playerctl_active {
  playerctl status >/dev/null 2>&1
}
function is_playerctl_playing {
  [[ $(playerctl status) == "Playing" ]]
}
function is_mpc_active {
  mpc status >/dev/null 2>&1
}
function is_mpc_playing {
  [[ $(mpc status) =~ \[playing\] ]]
}

function run_playerctl_command {
  playerctl $PLAYERCTL_COMMAND
  echo playerctl > $LAST_COMMAND_FILE
}
function run_mpc_command {
  mpc $MPC_COMMAND
  echo mpc > $LAST_COMMAND_FILE
}
function run_both_commands {
  playerctl $PLAYERCTL_COMMAND
  mpc $MPC_COMMAND
  rm $LAST_COMMAND_FILE
}
function is_last_command_playerctl {
  [[ $(cat $LAST_COMMAND_FILE) == "playerctl" ]]
}
function is_last_command_mpc {
  [[ $(cat $LAST_COMMAND_FILE) == "mpc" ]]
}

# If both players (spotify and mpd) are active, see which of them
# is actually playing music right now and send the command to that
# one.
#
# If neither is playing, send the command to the player that
# most recently received a command. This way a player can be paused
# and resumed even if the other player is active as well.
#
# If it is not known which player most recently received a command
# then playerctl (spotify) will be given priority, as MPD is a daemon
# and might be running at all times.
#
# If both players are playing (why?) send the command to both. This
# will also clear the history of which player most recently received
# a command.
if is_playerctl_active && is_mpc_active
then
  if is_playerctl_playing && is_mpc_playing
  then
    run_both_commands
  elif is_playerctl_playing
  then
    run_playerctl_command
  elif is_mpc_playing
  then
    run_mpc_command
  else
    if is_last_command_playerctl
    then
      run_playerctl_command
    elif is_last_command_mpc
    then
      run_mpc_command
    else
      run_playerctl_command
    fi
  fi
elif is_playerctl_active
then
  run_playerctl_command
elif is_mpc_active
then
  run_mpc_command
else
  exit 1
fi

exit 0
