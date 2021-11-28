#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "SSD" "${HOSTNAME}" "jan" ".ssh Desktop Documents Downloads Pictures Videos Templates Projects"

