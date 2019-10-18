#!/bin/bash

cd $HOME
set -m
/usr/bin/nohup java -jar aerospike-java-benchmark.jar -h ${genericHelper.aerospikeSeeds(connectToCluster, 1)} ${(args)!} &> ${logFile!"/var/log/client.log"} &
