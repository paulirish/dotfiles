#!/bin/bash
file="$(cmus-remote -C 'echo {}')"

TARGET_DIR=${GOOD_SONGS_DIR:-"/media/music/_NEW/_GoodSongs"}

if [ -f "$file" ]; then
  mv "${file}" $TARGET_DIR && cmus-remote -C 'win-remove'
else
  echo "Oop, couldn't find selected track ${file}" >&2
fi
