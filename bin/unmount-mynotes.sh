veracrypt -d /media/MyNotes

echo -n "Have you change any data in the container (y/n)? "
read -r answer
if echo "$answer" | grep -iq "^y" ;then
   touch ~/Secure/MyNotes.tc
fi

