#!/bin/bash

cd /usr/local/cassandra/
set -m
/usr/bin/nohup ./bin/cassandra -R &> ${logFile!"/var/log/cassandra.log"}
