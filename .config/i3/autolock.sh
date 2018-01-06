#!/bin/sh

TIME=${1:-10}

exec xautolock -detectsleep \
  -time $TIME -locker "~/.config/i3/lock.sh" \
  -notify 30 \
  -notifier "notify-send -u critical --icon=dialog-information -t 10000 -- 'AutoLock' 'Screen will be locked in 30 seconds'"
