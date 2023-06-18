function rsync_remote() {
  local server_address=$1
  local target_dir="${user}@${server_address}:/volume1/backup/${2}/"
  local user=$3
  local source_dir="$4/"
  local exclude_from_file=$5

  # echo "*******************************"
  # echo "server_address: $server_address"
  # echo "target_dir: $target_dir"
  # echo "user: $user"
  # echo "source_dir: $source_dir"
  # echo "exclude_from_file: $exclude_from_file"
  # echo "*******************************"

  echo "backup directory $source_dir to $target_dir"
  echo "------------------------------------------"

  rsync -avu --progress --delete                    \
        --exclude-from=$exclude_from_file           \
        -e "ssh -i /home/$(whoami)/.ssh/rsync-key"  \
        "${source_dir}" "${target_dir}"
}

function rsync_local() {
  local target_dir="/run/media/jan/BACKUP-HD/${1}/"
  local user=$2
  local source_dir="$3/"
  local exclude_from_file=$4

  # echo "*******************************"
  # echo "target_dir: $target_dir"
  # echo "user: $user"
  # echo "source_dir: $source_dir"
  # echo "exclude_from_file: $exclude_from_file"
  # echo "*******************************"

  mkdir -p $target_dir

  echo "backup directory $source_dir to $target_dir"
  echo "------------------------------------------"

  rsync -avu --progress --delete            \
        --exclude-from=$exclude_from_file   \
        "${source_dir}" "${target_dir}"
}

function backup {
  local server_address=$1
  local target_dir=$2
  local user=$3
  local source_dir=$4
  local exclude_from_file=$5

  echo "Create backup on target-device ${server_address} for computer $(hostname) for user $(whoami) at $(date +%d-%m-%yT%H:%M:%S)"

  if [ "${server_address}" == "USB" ]; then
    rsync_local "$target_dir" "$user" "$source_dir" "$exclude_from_file"
  else
    rsync_remote "$server_address" "$target_dir" "$user" "$source_dir" "$exclude_from_file"
  fi
}
