mount-backup.sh

rsync -avuz --progress \
      ~/Secure/ \
      /media/jan/Backup/Secure

unmount-backup.sh

