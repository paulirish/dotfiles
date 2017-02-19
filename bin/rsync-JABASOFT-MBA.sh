#!/bin/sh

SERVER_ADDRESS=JABASOFT-DS
HOSTNAME="JABASOFT-MBA"
USER=jan

for DIRECTORY_NAME in Desktop Documents Downloads Pictures Movies temp; do
  rsync -avuz --progress --delete \
        --exclude=".DS_STORE" --exclude=".localized" \
        --exclude="node_modules" --exclude=".git" \
        ~/$DIRECTORY_NAME \
        $USER@$SERVER_ADDRESS:/volume1/homes/$USER/$HOSTNAME/
done

