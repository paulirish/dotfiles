#!/bin/sh

SUDO_PWD=$(pass /home/sudo)

for SHARE in video music daten photo; do
  IS_MOUNTED=$(mount -ls | grep ${SHARE})
  if [ -n "${IS_MOUNTED}" ]; then
    echo ${SUDO_PWD} | sudo -S umount /media/$SHARE
  fi
done
