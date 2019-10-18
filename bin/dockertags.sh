#!/bin/bash

i=0

while [ $? == 0 ]
do
   i=$((i+1))
   curl https://registry.hub.docker.com/v2/repositories/library/$1/tags/?page=$i 2>/dev/null|jq '."results"[]["name"]'

done

