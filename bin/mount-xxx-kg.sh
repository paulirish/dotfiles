SUDO_PWD=$(gopass show /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -p $(gopass show /home/veracrypt/XXX-KG) ~/Secure/XXX-KG.tc /media/XXX-KG
