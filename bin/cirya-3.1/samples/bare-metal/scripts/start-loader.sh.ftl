#!/bin/bash
ip2int()
{
    local a b c d
    { IFS=. read a b c d; } <<< $1
    echo $(((((((a << 8) | b) << 8) | c) << 8) | d))
}

network()
{
    local addr=$(ip2int $1); shift
    local mask=$((0xffffffff << (32 -$1))); shift
    echo $((addr & ~mask))
}

interface=ethwe0

ip a | grep $interface
if [ "$?" == "1" ]; then
    interface=$(ip route show to 0.0.0.0/0 | sed -e 's/.* dev //g' | cut -f 1  -d ' ')
fi


# get the ip address
ip_addr="$(ip -o -f inet addr show  | grep $interface | awk '/scope global/ {print $4}' | cut -d "/" -f 1)"

# get the subnet mask
subnet_mask="$(ip -o -f inet addr show  | grep $interface | awk '/scope global/ {print $4}' | cut -d "/" -f 2)"

client_id=$(network $ip_addr $subnet_mask)

cd ~/sherlock-cp-loader*/

set -m

/usr/bin/nohup ./bin/sherlock-cp-loader -hpl ${genericHelper.aerospikeSeeds(connectToCluster, 1)} \
-f ${logFile} \
-numKeys ${numKeys?c} \
-r ${rate} \
-cid $client_id &> nohup.out &
