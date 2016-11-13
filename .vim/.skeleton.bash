#!/bin/bash
help="
This script helps you doing stuff

usage: ./sync [-options]

Where options can be:
  -h     help!!! help!!
"
while getopts "h" opt; do
  case $opt in
    h)
      echo "$help">&2
      exit
      ;;
    y)
      yes=true
      ;;
    *)
      echo "$help">&2
      exit
      ;;
  esac
done
# this will exit if no options given and it'll show help
if [ $OPTIND -eq 1 ]; then
  echo "$help">&2
  exit
fi

# code in here
echo 'my script'
# code in here
