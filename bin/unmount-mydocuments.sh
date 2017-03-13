veracrypt -d /media/MyDocuments

echo -n "Have you change any data in the container (y/n)? "
read answer
if echo "$answer" | grep -iq "^y" ;then
   touch ~/Secure/MyDocuments.tc
fi

