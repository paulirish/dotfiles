#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "USB" "${HOSTNAME}/$(whoami)" "$(whoami)" "/home/$(whoami)" "/home/$(whoami)/rsync-local-excludes"
