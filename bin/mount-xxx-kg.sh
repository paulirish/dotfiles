SUDO_PWD=$(pass /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -p $(pass /home/veracrypt/XXX-KG) ~/Secure/XXX-KG.tc /media/XXX-KG
