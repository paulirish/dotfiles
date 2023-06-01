function rsync_remote() {
  local server_address=$1
  local hostname=$2
  local user=$3
  local source_path=$4
  local includes_excludes=${@:5}

  echo "backup directory $source_path"
  echo "------------------------------------------"

  rsync -avu --progress --delete                                                    \
        ${includes_excludes}                                                        \
        -e "ssh -i /home/${user}/.ssh/rsync-key -p $JABASOFT_DS_SSH_PORT"           \
        ${source_path} ${user}@${server_address}:/volume1/backup/${hostname}/${user}/

  echo ""
}

function rsync_local() {
  local hostname=$1
  local user=$2
  local source_path=$3
  local includes_excludes=${@:4}

  local target_dir="/run/media/jan/BACKUP-HD/${hostname}/${user}"

  mkdir -p $target_dir

  echo "backup directory $source_path"
  echo "------------------------------------------"

  rsync -avu --progress --delete \
        ${includes_excludes}                                                         \
        ${source_path} $target_dir
}

function backup {
  local server_address=$1
  local hostname=$2
  local user=$3
  local directories=$4
  local home_dir="/home/${user}"

  if [ -z "${hostname}" ]; then
    echo "hostname is not provided, script aborted"
    return
  fi

  echo "Create backup on server ${server_address} for computer ${hostname} in user-home for ${user} at $(date +%d-%m-%yT%H:%M:%S)"

  if [ -z "${directories}" ]; then
    rsync_local $hostname $user "${home_dir}/" --exclude="node_modules/" --exclude="go" --exclude=".DS_store" --exclude=".localized" --exclude="debug" --exclude="*cache" --exclude=".rustup" --exclude=".local"
    return
  fi

  for directory_name in $directories; do
    if [ "${server_address}" == "USB" ]; then
      rsync_local $hostname $user "${home_dir}/${directory_name}" --exclude="node_modules/" --exclude=".DS_store" --exclude=".localized" --exclude="debug" --exclude="*cache"
    else
      rsync_remote $server_address $hostname $user "${home_dir}/${directory_name}" --exclude="node_modules/" --exclude=".DS_store" --exclude=".localized" --exclude="debug" --exclude="*cache"
    fi
  done

  if [ "${server_address}" == "USB" ]; then
    rsync_local $hostname $user "${home_dir}/" --exclude=".local/" --include="*.local" --include=".smb" --exclude="*"
  else
    rsync_remote $server_address $hostname $user "${home_dir}/" --exclude=".local/" --include="*.local" --include=".smb" --exclude="*"
  fi
}
