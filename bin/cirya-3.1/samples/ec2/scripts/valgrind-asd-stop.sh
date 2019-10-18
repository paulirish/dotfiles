#!/bin/bash

pkill -USR1 memcheck

# wait for valgrind to finish analyzing and logging
sleep 10
