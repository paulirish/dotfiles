#!/bin/bash

# kill asd
pkill -9 asd

# wait for asd to die
sleep 5

# run asd with valgrind
valgrind --leak-check=full --soname-synonyms=somalloc=nouserintercepts --log-file=/var/log/aerospike/aerospike-valgrind.txt /usr/bin/asd --config-file /etc/aerospike/aerospike.conf --instance=1
