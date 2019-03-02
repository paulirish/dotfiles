SUDO_PWD=$(pass /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -p $(pass /home/veracrypt/MyNotes) ~/Secure/MyNotes.tc /media/MyNotes
