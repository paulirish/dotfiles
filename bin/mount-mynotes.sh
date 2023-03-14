SUDO_PWD=$(gopass show /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -p $(gopass show /home/veracrypt/MyNotes) ~/Secure/MyNotes.tc /media/MyNotes
