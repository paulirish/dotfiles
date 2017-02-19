#!/bin/sh

SERVER_ADDRESS=JABASOFT-DS
HOSTNAME="JABASOFT-LINUX1"
USER=jan

for DIRECTORY_NAME in Desktop Downloads Pictures Videos Music Templates; do
  rsync -avuz --progress --delete ~/$DIRECTORY_NAME -e '/usr/bin/ssh' $USER@$SERVER_ADDRESS:/volume1/homes/$USER/$HOSTNAME/
done

