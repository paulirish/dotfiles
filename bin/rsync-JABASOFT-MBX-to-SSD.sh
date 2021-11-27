#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "SSD" "${HOSTNAME}" "jan" ".ssh Desktop Documents Downloads Pictures Videos Music Templates Secure Projects"

