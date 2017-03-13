veracrypt -d /media/XXX-KG

echo -n "Have you change any data in the container (y/n)? "
read answer
if echo "$answer" | grep -iq "^y" ;then
   touch ~/Secure/XXX-KG.tc
fi

