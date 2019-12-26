function backup {
  SERVER_ADDRESS=$1
  HOSTNAME=$2
  USER=$3
  DIRECTORIES=$4

  if [ -z "${HOSTNAME}" ]; then
    echo "HOSTNAME is not provided, script aborted"
    return
  fi
  
  echo "Create backup on server ${SERVER_ADDRESS} for computer ${HOSTNAME} in user-home for ${USER}"

  for DIRECTORY_NAME in $DIRECTORIES; do
    rsync -avuz --progress --delete \
          --exclude="node_modules/" --exclude=".DS_store" --exclude=".localized" \
          -e "ssh -i /home/${USER}/.ssh/rsync-key -p $JABASOFT_DS_SSH_PORT" \
          /home/${USER}/${DIRECTORY_NAME} ${USER}@${SERVER_ADDRESS}:/volume1/homes/${USER}/${HOSTNAME}/
  done

  rsync -avuz --progress --delete \
        --exclude=".local/" --include="*.local" --exclude="*" \
        -e "ssh -i /home/${USER}/.ssh/rsync-key -p ${JABASOFT_DS_SSH_PORT}" \
        /home/${USER}/ ${USER}@${SERVER_ADDRESS}:/volume1/homes/${USER}/${HOSTNAME}/
}

