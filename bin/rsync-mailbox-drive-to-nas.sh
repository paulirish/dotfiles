#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "jabasoft-ds" "MAILBOXORG-DRIVE" "$(whoami)" "/media/jan/mailbox-drive/Jan Baer" "/home/$(whoami)/rsync-mailbox-drive-excludes"
