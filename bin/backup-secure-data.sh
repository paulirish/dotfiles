mount-backup.sh

rsync -avuz --progress \
      ~/Secure/ \
      /run/media/jan/BACKUP/Secure

unmount-backup.sh

