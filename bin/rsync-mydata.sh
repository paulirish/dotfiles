function backup {
  SERVER_ADDRESS=$1
  HOSTNAME=$2
  USER=$3
  DIRECTORIES=$4

  for DIRECTORY_NAME in $DIRECTORIES; do
    rsync -avuz --progress --delete \
          --exclude="node_modules/" --exclude="DS_store" --exclude=".localized" \
          -e "ssh -i ~/.ssh/rsync-key" \
          ~/$DIRECTORY_NAME $USER@$SERVER_ADDRESS:/volume1/homes/$USER/$HOSTNAME/
  done
}

