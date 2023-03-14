SUDO_PWD=$(gopass show /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -p $(gopass show /home/veracrypt/MyDocuments) ~/Secure/MyDocuments.tc /media/MyDocuments
