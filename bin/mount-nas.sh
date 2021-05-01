#!/bin/sh

SERVER_ADDRESS=JABASOFT-DS
USER=jan

for SHARE in video music daten photo setup; do
  IS_MOUNTED=$(mount -ls | grep ${SHARE})
  if [ -z "${IS_MOUNTED}" ]; then
    mount //$SERVER_ADDRESS/$SHARE
  fi
done

mount //$SERVER_ADDRESS/homes/$USER
