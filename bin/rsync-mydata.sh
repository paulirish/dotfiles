function rsync_remote() {
  local server_address=$1
  local hostname=$2
  local user=$3
  local source_path=$4

  local target_path="${user}@${server_address}:/volume1/backup/${hostname}/${user}/"

  echo "backup directory $source_path to $target_path"
  echo "------------------------------------------"

  rsync -avu --progress --delete                                                    \
        --exclude-from=/home/jan/rsync-remote-excludes                              \
        -e "ssh -i /home/${user}/.ssh/rsync-key"                                    \
        ${source_path} ${target_path}
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

  rsync -avu --progress --delete                      \
        --exclude-from=/home/jan/rsync-local-excludes \
        ${source_path} $target_dir
}

function backup {
  local server_address=$1
  local hostname=$2
  local user=$3
  local directories=$4
  local home_dir="/home/${user}/"

  if [ -z "${hostname}" ]; then
    echo "hostname is not provided, script aborted"
    return
  fi

  echo "Create backup on server ${server_address} for computer ${hostname} in user-home for ${user} at $(date +%d-%m-%yT%H:%M:%S)"

  if [ "${server_address}" == "USB" ]; then
    rsync_local $hostname $user $home_dir
  else
    rsync_remote $server_address $hostname $user $home_dir
  fi
}
