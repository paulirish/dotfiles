USER=$(whoami)
PASSWORD=$(pass /home/JABASOFT-DS/restic)

if [ -z "${PASSWORD}" ]; then
  echo "Got no password from pass, aborted..."
  exit 1
fi

echo "Show existing backups for ${HOSTNAME}"

RESTIC_PASSWORD=${PASSWORD} restic -r rest:http://${USER}:${PASSWORD}@JABASOFT-DS:9000/${HOSTNAME} snapshots

