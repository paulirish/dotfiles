#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "USB" "${HOSTNAME}/$(whoami)" "$(whoami)" "/home/$(whoami)" "/home/$(whoami)/rsync-local-excludes"
backup "USB" "${HOSTNAME}/local-bin" "$(whoami)" "/usr/local/bin" "/home/$(whoami)/rsync-local-excludes"
