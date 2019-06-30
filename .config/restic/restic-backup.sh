USER=$(whoami)
PASSWORD=$(pass /home/JABASOFT-DS/restic)

if [ -z "${PASSWORD}" ]; then
  echo "Got no password from pass, aborted..."
  exit 1
fi

echo "Create backup for ${HOSTNAME} with user ${USER}..."

RESTIC_PASSWORD=${PASSWORD} restic -r rest:http://${USER}:${PASSWORD}@JABASOFT-DS:9000/${HOSTNAME}  \
    backup ~/Projects ~/Documents ~/Pictures ~/Videos                                                \
    --verbose                                                           \
    --host=${HOSTNAME}                                                  \
    --exclude-file=/home/${USER}/.config/restic/excludes

