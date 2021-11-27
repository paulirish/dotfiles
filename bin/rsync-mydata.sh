function rsync_remote() {
  local server_address=$1
  local hostname=$2
  local user=$3
  local source_path=$4

  echo "backup directory $source_path"
  echo "------------------------------------------"

  rsync -avu --progress --delete \
        --exclude=".local/" --include="*.local" --include=".smb" --exclude="*" \
        ${@:5} \
        ${source_path} ${user}@${server_address}:/volume1/homes/${user}/${hostname}/

  echo ""
}

function rsync_local() {
  local hostname=$1
  local user=$2
  local source_path=$3

  local target_dir="/run/media/jan/TRANSFER_SSD/${user}/${hostname}/"

  mkdir -p $target_dir

  echo "backup directory $source_path"
  echo "------------------------------------------"

  rsync -avu --progress --delete \
        ${@:4} \
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

  echo "Create backup on server ${server_address} for computer ${hostname} in user-home for ${user}"

  for directory_name in $directories; do
    if [ "${server_address}" == "SSD" ]; then
      rsync_local $hostname $user "${home_dir}/${directory_name}" --exclude="node_modules/" --exclude=".DS_store" --exclude=".localized"
    else
      rsync_remote $server_address $hostname $user "${home_dir}/${directory_name}" --exclude="node_modules/" --exclude=".DS_store" --exclude=".localized"
    fi
  done

  if [ "${server_address}" == "SSD" ]; then
    rsync_local $hostname $user "${home_dir}/" --exclude=".local/" --include="*.local" --include=".smb" --exclude="*"
  else
    rsync_remote $server_address $hostname $user "${home_dir}/" --exclude=".local/" --include="*.local" --include=".smb" --exclude="*"
  fi
}
