MOUNT_NAME="MyDocuments"
PWD="$(gopass show /home/veracrypt/${MOUNT_NAME})"
NUMBER=1

veracrypt --password "${PWD}" --protect-hidden no  \
  --pim 0 --slot "${NUMBER}" --keyfiles ""         \
  --mount ~/Secure/${MOUNT_NAME}.tc /media/${MOUNT_NAME}
