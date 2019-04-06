#!/bin/bash

. ~/bin/rsync-mydata.sh

backup "JABASOFT-DS" "${HOST}" "$(whoami)" ".ssh Desktop Documents Downloads Pictures Videos"

