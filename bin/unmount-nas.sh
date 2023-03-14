#!/bin/sh

SUDO_PWD=$(gopass show /home)

for SHARE in video music daten photo setup home; do
  IS_MOUNTED=$(mount -ls | grep ${SHARE})
  if [ -n "${IS_MOUNTED}" ]; then
    echo ${SUDO_PWD} | sudo -S umount /media/jan/$SHARE
  fi
done
