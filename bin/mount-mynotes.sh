SUDO_PWD=$(pass /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -v -p $(pass /home/veracrypt/MyNotes) ~/Secure/MyNotes.tc /media/MyNotes
