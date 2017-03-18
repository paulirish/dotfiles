#!/bin/sh

SERVER_ADDRESS=JABASOFT-DS
USER=jan
PASSWORD=$(pass /home/JABASOFT-DS/jan)

for SHARE in video music daten photo XXX; do
  sudo mount -t cifs //$SERVER_ADDRESS/$SHARE /media/$SHARE -o username=$USER,password=$PASSWORD
done
