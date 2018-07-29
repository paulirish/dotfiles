#!/bin/sh

SERVER_ADDRESS=JABASOFT-DS
USER=jan
PASSWORD=$(pass /home/JABASOFT-DS/jan)
SUDO_PWD=$(pass /home/sudo)

for SHARE in video music daten photo; do
  echo ${SUDO_PWD} | sudo -S sudo mount -t cifs //$SERVER_ADDRESS/$SHARE /media/$SHARE -o username=$USER,password=$PASSWORD
done
