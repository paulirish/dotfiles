#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "USB" "${HOSTNAME}" "jan" ".ssh Desktop Documents Downloads Pictures Templates Secure Projects"

