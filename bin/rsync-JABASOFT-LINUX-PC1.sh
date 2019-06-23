#!/bin/bash

. ~/bin/rsync-mydata.sh

backup "JABASOFT-DS" "${HOSTNAME}" "$(whoami)" ".ssh Desktop Documents Downloads Pictures Videos Music Templates Secure"

