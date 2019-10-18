#!/usr/bin/env bash

set -x
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h localhost -p 32829 -b :9150 &> /tmp/aeromonlog_new1 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h localhost -p 32807 -b :9145 &> /tmp/aeromonlog1 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h localhost -p 32816 -b :9146 &> /tmp/aeromonlog2 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h localhost -p 32819 -b :9147 &> /tmp/aeromonlog3 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h 192.168.200.239 -p 3000 -b :8145 -tags qa > /tmp/aeromonlogx90.txt 2>&1 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h 192.168.200.239 -p 3010 -b :8146 -tags qa > /tmp/aeromonlogx90.txt 2>&1 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h 192.168.200.240 -p 3000 -b :8147 -tags qa > /tmp/aeromonlogx100.txt 2>&1 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h 192.168.200.240 -p 3010 -b :8148 -tags qa > /tmp/aeromonlogx101.txt 2>&1 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h 192.168.200.241 -p 3010 -b :8149 -tags qa > /tmp/aeromonlogx111.txt 2>&1 &
nohup  $GOPATH/src/github.com/citrusleaf/aeromon/aeromon -h 192.168.200.241 -p 3000 -b :8150 -tags qa > /tmp/aeromonlogx110.txt 2>&1 &

tail -f /tmp/aeromonlog*

