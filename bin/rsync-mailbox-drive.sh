#!/bin/bash

function rsync_remote() {
  local server_address=$1
  local hostname=$2
  local user=$3
  local source_path=$4
  local includes_excludes=${@:5}

  echo "backup $source_path"
  echo "------------------------------------------"

  rsync -avu --progress --delete                                                    \
        ${includes_excludes}                                                        \
        -e "ssh -i /home/${user}/.ssh/rsync-key -p $JABASOFT_DS_SSH_PORT"           \
        "${source_path}" ${user}@${server_address}:/volume1/backup/${hostname}/

  echo ""
}

function backup {
  local server_address=$1
  local hostname=$2
  local user=$3
  local directories=$4
  local source_dir="/media/jan/drive/Jan Baer"

  if [ -z "${hostname}" ]; then
    echo "hostname is not provided, script aborted"
    return
  fi

  echo "Create backup on server ${server_address} for computer ${hostname} in user-home for ${user} at $(date +%d-%m-%yT%H:%M:%S)"

  for directory_name in $directories; do
    rsync_remote $server_address $hostname $user "${source_dir}/${directory_name}" --exclude="node_modules/" --exclude=".DS_store" --exclude=".localized"
  done
}

backup "JABASOFT-DS" "MAILBOXORG-DRIVE" "jan" "CHECK24 Documents Keepass Notes Pictures"
