createLockImage() {
  LOCK_IMAGE=~/.config/i3/lock-screen.png
  screenshotFileName=$1

  scrot $screenshotFileName
  convert $screenshotFileName -blur 0x5 -scale 10% -scale 1000% $screenshotFileName
  convert $screenshotFileName $LOCK_IMAGE -gravity center -composite -matte $screenshotFileName
}


