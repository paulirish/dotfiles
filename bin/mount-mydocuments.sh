SUDO_PWD=$(pass /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -v -p $(pass /home/veracrypt/MyDocuments) ~/Secure/MyDocuments.tc /media/MyDocuments
