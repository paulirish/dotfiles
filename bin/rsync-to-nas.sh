#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "jabasoft-ds" "${HOSTNAME}/$(whoami)" "$(whoami)" "/home/$(whoami)" "/home/$(whoami)/rsync-remote-excludes"
