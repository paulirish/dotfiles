#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "JABASOFT-DS" "${HOSTNAME}" "jan" ".ssh Desktop Documents Downloads Pictures Videos Music Templates Secure"

