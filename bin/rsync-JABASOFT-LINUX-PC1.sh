#!/bin/bash

. ~/bin/rsync-mydata.sh

backup "JABASOFT-DS" "${HOST}" "$(whoami)" ".ssh .config Desktop Documents Downloads Pictures Videos Music Templates Secure"

