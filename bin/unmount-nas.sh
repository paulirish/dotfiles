#!/bin/sh

SERVER_ADDRESS=JABASOFT-DS

for SHARE in video music daten photo XXX; do
  sudo umount /media/$SHARE
done
