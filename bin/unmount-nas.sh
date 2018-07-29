#!/bin/sh

SUDO_PWD=$(pass /home/sudo)

for SHARE in video music daten photo; do
  echo ${SUDO_PWD} | sudo -S umount /media/$SHARE
done
