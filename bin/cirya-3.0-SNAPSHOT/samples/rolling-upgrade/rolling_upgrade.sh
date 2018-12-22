#!/bin/bash

function is_migrating() {
    cmd_output=$(cirya-node execute-all "asinfo -v statistics -l"  | grep migrate_partitions_remaining )
    num=$(echo "$cmd_output" | wc -l)
    wait=0
    if [ $num -ne $num_nodes ]
        then wait=1
    fi

    migrations=$(echo "$cmd_output" | cut -d "=" -f 2)

    while read -r line
    do
       if [ $line -ne 0 ]
       then
           wait=1
       fi
    done <<< $migrations
    echo $wait
}

num_nodes=$(cirya-node ps | wc -l)
num_nodes=$(($num_nodes - 1))

for (( node=0; node<$num_nodes; node++ ))
do
	echo "upgrading node $node"

	# use -p onlyTls=true to generate only tls enabled config (no non tls config)
    cirya-node reconfigure [$node] -b https://www.aerospike.com/enterprise/download/server/latest/artifact/ubuntu16

    wait=$(is_migrating)
    while [ $wait -eq 1 ]
    do
    	echo "waiting for migrations"
    	sleep 2
    	wait=$(is_migrating)
    done
done <<< $nodes
