#!/bin/bash
# slowtype - type text documents slowly

nonstopmode=""
file=""

hotkeys_usage(){
 echo " Interactive keys:" >&2
 echo "  SPACE - Pause/Continue" >&2
 echo "  ENTER - Print all until next paragraph" >&2
 echo "  ?     - help" >&2
 echo "  c     - clear screen" >&2
 echo "  n     - toggle Nonstop mode (pausing at paragraph end)" >&2
 echo "  q     - finish current line and quit" >&2
}

usage(){
 echo "Usage: $0 [options] filename" >&2
 echo " Typewriting source code with syntax highlighting" >&2
 echo " (C) Klaus Knopper 2012, License: GPL V2" >&2
 echo "" >&2
 echo "Options:" >&2
 echo "  -h    - help" >&2
 echo "  -c    - clear screen first" >&2
 echo "  -n    - nonstop mode (don't stop at paragraph)" >&2
 echo "" >&2
 hotkeys_usage
}

# Split options vs. files
for arg in "$@"; do
 case "$arg" in
  -c) clear ;;
  -n) nonstopmode=true ;;
  -h|--help|-\?) usage; exit 0 ;;
   *) [ -r "$arg" ] && file="$arg" || { usage ; exit 1; } ;;
 esac
done
 
if [ ! -r "$file" ]; then
 usage
 exit 1
fi

# 0.0$sleepvalue
usleepchar="5000"
usleepspace="5000"
usleepline="5000"
usleeppar="5000"

charmode="true"
linemode=""
parmode=""

KEY=""
ACTION=""

trap bailout 1 2 3 10 15

bailout(){
 stty echo >/dev/tty </dev/tty
 exit $1
}

evalkey(){
 if [ x"$KEY" = x"" ]; then # Return: print all till next paragraph
  ACTION=next; nonstopmode=""
 else
  case x"$KEY" in
    x[qQ]) ACTION="quit" ;;
    x[nN]) [ -n "$nonstopmode" ] && nonstopmode="" || nonstopmode="true" ;;
    x[cC]) ACTION="clear" ;;
    x\?)   ACTION="help" ;;
  esac
 fi
}

waitforkey(){
 while true; do IFS='' read -r -n 1 -s -t "0.25" KEY && break; done </dev/tty
}

# waitforkey timeout
readkey(){
 local t="$1"
 ACTION=""
 if IFS='' read -r -n 1 -s -t "$t" KEY </dev/tty; then
  if [ x"$KEY" = x" " ]; then # Space: Wait for any key
   nonstopmode=""
   waitforkey
  fi
  evalkey
 fi
}

delay(){
 local d=0
 if [ 0 -le "$1" ] 2>/dev/null; then
  let d=$RANDOM%5000+$1
 else
  [ -n "$charmode" ] && let d+="$usleepchar"
  [ -n "$linemode" ] && let d+="$usleepline"
  [ -n "$parmode" ]  && let d+="$usleeppar"
  let d+=$RANDOM%5000
 fi
 readkey "0.0$d"
}

### MAIN

stty -echo
while IFS='' read -r line; do
 if [ -z "$nonstopmode" -a -z "$line" ]; then
  ACTION=""
  waitforkey
  evalkey
 fi
 l="$line"
 while [ -n "$l" ]; do
  echo -n "${l:0:1}"
  l="${l#?}"
  [ -n "$ACTION" ] || delay
 done
 echo ""
 case x"$ACTION" in
  xquit) bailout 0 ;;
  xhelp) hotkeys_usage; ACTION=""; waitforkey; evalkey;; 
  xclear) echo -n -e "\033[H\033[J"; ACTION=""; waitforkey; evalkey;;
 esac
done <<.
$(highlight -O ansi "$file" | tr -d '\r')
.

bailout 0
