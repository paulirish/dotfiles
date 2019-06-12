#!/bin/bash

cd $HOME
set -m
/usr/bin/nohup java -jar aerospike-java-benchmark.jar -h 192.168.201.221 ${(args)!} &> ${logFile!"/var/log/client.log"} &
