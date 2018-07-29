SUDO_PWD=$(pass /home/sudo)

echo ${SUDO_PWD} | sudo -S veracrypt -d /media/MyNotes

echo -n "Have you change any data in the container (y/n)? "
read answer
if echo "$answer" | grep -iq "^y" ;then
   touch ~/Secure/MyNotes.tc
fi

