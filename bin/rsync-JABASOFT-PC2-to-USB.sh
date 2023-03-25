#!/bin/bash

. /home/jan/bin/rsync-mydata.sh

backup "USB" "${HOSTNAME}" "jan" ".ssh Desktop Documents Downloads Pictures Projects Videos Music Templates Secure .kube .k9s .3T/roaming VMs"

