# Simple Aerospike client server setup
This example allows you to set up two clusters with one cluster as aerospike servers and the other as aerospike clients running java benchmarks.

## Prerequisites
This README assumes that you followed installation steps [here](https://github.com/citrusleaf/aerospike-docker-orchestrator/blob/master/cirya-cli/README.md).

# Infrastructure using local docker service
Make sure your docker service is listening on the endpoint localhost:2375
<pre>
<code>
   ...
infrastructure:
  pools:
    localhost:
      provider: docker
   ...
</code>
</pre>

## Cirya configuration
The [cirya configuration file](cirya.yml) sets up two clusters, generic and aerospike, each running ubuntu-18.04 for illustration purposes.
The generic clusters additionally have java jdk8 installed.

The container section from the cirya file defines two container groups (aka templates for cluster). One group using an ubuntu image and the other
group using same image with java jdk8.

<pre>
<code>
...
containers:
  groups:
    aerospike:
      image: /aerospike/cirya-ubuntu-18.04

    benchmark:
      image: /aerospike/cirya-ubuntu-18.04-jdk8
...
</code>
</pre>

In the clusters section of the configuration file, we set up two clusters
 * benchmark - which run aerospike clients, which uses generic-cluster container group
 * aerospike - the aerospike cluster, which uses the aerospike-cluster group

<pre>
<code>
...
clusters:
 aerospike:
  archivePath: https://www.aerospike.com/download/server/4.0.0.5/artifact/ubuntu16
  aerospikeConfTemplate: aerospike-mesh.conf.ftl
  params:
    clusterName: mesh-test

 benchmark:
  group: benchmark
  type: generic
  archivePath: https://drive.google.com/uc?export=download&id=1EaTLxmrq1osf1Qulj-Q_SRZZc8Scl6LG
  installScript: file://install-benchmark.sh
  startScript: file://start-benchmark.sh.ftl
  stopScript: |
    while pgrep java; do
      pkill -SIGKILL java
      sleep 0.5
    done
  isRunningScript: pgrep java
  params:
   logFile: /var/log/benchmark.log
   connectToCluster: aerospike
...
</code>
</pre>

For explanation on cirya config structure and semantics refer [here](https://github.com/citrusleaf/aerospike-docker-orchestrator#configure).

## Commands
You will need to run following commands from this directory.

### Initialize Infrastructure
Initialize the infrastructure if not done yet.

```
cirya init
```

### Register Image
Register required images.

**Note:** This needs to be done only once per image. Subsequent node launches for a registered image can skip the register step.
```
cirya image-register -f ../../images/Dockerfile.cirya-ubuntu-18.04 -n aerospike/cirya-ubuntu-18.04

cirya image-register -f ../../images/Dockerfile.cirya-ubuntu-18.04-jdk8 -n aerospike/cirya-ubuntu-18.04-jdk8
```

### Launch aerospike nodes
```
cirya -c aerospike launch 3

aerospike-7e12
aerospike-395a
aerospike-6567
```
Verify the nodes with a <b>asadm</b> command

```
cirya -c aerospike asadm

Aerospike Interactive Shell, version 0.1.15

Found 3 nodes
Online:  192.168.56.3:32789, 192.168.56.3:32775, 192.168.56.3:32788

Admin> info network
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Network Information~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Cluster                 Node               Node                   Ip        Build   Cluster   Migrations        Cluster     Cluster         Principal   Client     Uptime
     Name                    .                 Id                    .            .      Size            .            Key   Integrity                 .    Conns          .
mesh-test   192.168.56.3:32775   *BB9891CCF1B9186   192.168.56.3:32775   C-3.15.1.4         3      0.000     99616690ACCE   True        BB9891CCF1B9186        3   00:02:25
mesh-test   192.168.56.3:32788   BB97328EDFDB5C2    192.168.56.3:32788   C-3.15.1.4         3      0.000     99616690ACCE   True        BB9891CCF1B9186        3   00:02:25
mesh-test   192.168.56.3:32789   BB909045AB44082    192.168.56.3:32789   C-3.15.1.4         3      0.000     99616690ACCE   True        BB9891CCF1B9186        2   00:02:25
Number of rows: 3
```

### Launch aerospike clients

```
cirya -c benchmark launch 1 args="-w RU,50 -S 0 -k 1000"

benchmark-462b

```

Verify the benchmark logs

```
# [0] stands for first launched node, [1] for seoncd launched and so on..
# You could use the node id benchmark-462b as well.
cirya -c benchmark execute [0] tail -f /var/log/benchmark.log

2018-02-07 08:38:31.813 write(tps=5771 timeouts=0 errors=0) read(tps=5991 timeouts=0 errors=0) total(tps=11762 timeouts=0 errors=0)
2018-02-07 08:38:32.814 write(tps=6109 timeouts=0 errors=0) read(tps=6162 timeouts=0 errors=0) total(tps=12271 timeouts=0 errors=0)
2018-02-07 08:38:33.815 write(tps=6295 timeouts=0 errors=0) read(tps=6392 timeouts=0 errors=0) total(tps=12687 timeouts=0 errors=0)
2018-02-07 08:38:34.818 write(tps=5786 timeouts=0 errors=0) read(tps=5823 timeouts=0 errors=0) total(tps=11609 timeouts=0 errors=0)
2018-02-07 08:38:35.819 write(tps=5734 timeouts=0 errors=0) read(tps=5730 timeouts=0 errors=0) total(tps=11464 timeouts=0 errors=0)
2018-02-07 08:38:36.824 write(tps=5842 timeouts=0 errors=0) read(tps=5690 timeouts=0 errors=0) total(tps=11532 timeouts=0 errors=0)
2018-02-07 08:38:37.827 write(tps=5604 timeouts=0 errors=0) read(tps=5561 timeouts=0 errors=0) total(tps=11165 timeouts=0 errors=0)
2018-02-07 08:38:38.831 write(tps=5929 timeouts=0 errors=0) read(tps=5761 timeouts=0 errors=0) total(tps=11690 timeouts=0 errors=0)
2018-02-07 08:38:39.831 write(tps=5529 timeouts=0 errors=0) read(tps=5383 timeouts=0 errors=0) total(tps=10912 timeouts=0 errors=0)
2018-02-07 08:38:40.836 write(tps=4533 timeouts=0 errors=0) read(tps=4490 timeouts=0 errors=0) total(tps=9023 timeouts=0 errors=0)
```
### Restart clients with different params

```
cirya -c benchmark restart -a args="-w RU,50 -S 1001 -k 10000"
```

### ssh into nodes

```
cirya ssh benchmark-462b
```

### Terminate / remove the nodes

```
cirya  rma
```
