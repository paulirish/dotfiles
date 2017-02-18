if [ -z $NAUTILUS_SCRIPT_SELECTED_FILE_PATHS ]; then
gdialog --title "$SCRIPT_TITLE Error" --msgbox "No files have been selected"
400 400 2>&1
exit
#!/bin/bash
fi
notify-send "Move to GoodSonges" "Move the following files $NAUTILUS_SCRIPT_SELECTED_FILE_PATHS"

for arg
do
  mv "$arg" /media/music/_NEW/_GoodSongs
done
