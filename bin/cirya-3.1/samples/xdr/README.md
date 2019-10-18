# XDR active passive setup
This example allows you to set up three clusters with one cluster as source, one as a destination and one as aerospike client.

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

# Cirya configuration
The [cirya configuration file](cirya.yml) sets up three clusters, dc1, dc2 and benchmark. dc1 and benchmark running ubuntu 16 and dc2 running centos 7 for illustration purposes.

The container section from the cirya file defines three container groups (aka templates for cluster). Two groups using two ubuntu images and the other group using a centos image.

<pre>
<code>
...
containers:
  groups:
    ubuntu:
      image: /aerospike/cirya-ubuntu-18.04
    centos:
      image: /aerospike/cirya-centos-7.2
    benchmark:
      image: /aerospike/cirya-ubuntu-18.04-jdk8
...

	},
</code>
</pre>

In the clusters section of the configuration file, we set up three clusters
 * dc1 - the xdr source, which uses the ubuntu container group
 * dc2 - the xdr destination, which uses the centos container group
 * benchmark - the aerospike java benchmark, which is used to feed the source

**Note:** Replace the username `<insert-aerospike-username-here>` and password  `<insert-aerospike-password-here>` with password for aerospike enterprise downloads.

<pre>
<code>
...

clusters:
  dc1:
    group: ubuntu
    archivePath: http://www.aerospike.com/enterprise/download/server/latest/artifact/ubuntu16
    aerospikeConfTemplate: aerospike-xdr-dc1.cof.ftl
    downloadUserName: "<insert-download-username>"
    # Use quotes if the password has special characters.
    downloadUserPassword: "<insert-download-password>"
    params:
      clusterName: dc1
      multicastGroup: 239.1.1.1
      multicastPort: 5454

  dc2:
    group: centos
    archivePath: http://www.aerospike.com/download/server/latest/artifact/el7
    aerospikeConfTemplate: aerospike-xdr-dc2.conf.ftl
    params:
      clusterName: dc1
      multicastGroup: 239.1.1.1
      multicastPort: 5555

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

# DC1 aerospike.conf

The following line in [aerospike-xdr-dc1.conf.ftl](aerospike-xdr-dc1.conf.ftl) sets up dc1 launched containers to use current containers in dc2 as xdr destination seeds.

<pre>
<code>
...

xdr {
        enable-xdr true
        xdr-digestlog-path /opt/aerospike/xdr/digestlog 100G

        datacenter dc2 {
                ${xdrHelper.seeds("dc2")}
        }
  }

...
</code>
</pre>

# Commands
You will need to run commands from this directory.

## Initialize Infrastructure
Initialize the infrastructure if not done yet.

```
cirya init
```

## Register Image
Register required images.

**Note:** This needs to be done only once per image. Subsequent node launches for a registered image can skip the register step.
```
cirya image-register -f ../../images/Dockerfile.cirya-ubuntu-18.04 -n aerospike/cirya-ubuntu-18.04

cirya image-register -f ../../images/Dockerfile.cirya-centos-7.2 -n aerospike/cirya-centos-7.2

cirya image-register -f ../../images/Dockerfile.cirya-ubuntu-18.04-jdk8 -n aerospike/cirya-ubuntu-18.04-jdk8
```
Registering the above commands will take time to complete depending on the network capability.

## Launch DC2 nodes
```
cirya -c dc2 launch 3
```

Notice the -c argument which selects dc2 cluster for subsequent command.

Verify the nodes with a **ps** command
```
cirya -c dc2 ps

ID      Name    AS-ID
60918ed5        dc2-2036        BB988BA676E28AE
90f61c8b        dc2-f455        BB90646539C1C9E
b8f0e913        dc2-3025        BB9BA83BD3561D6
```

## Launch DC1 nodes
```
cirya launch 2
```

Notice by default the first cluster defined in cirya config is used.

Verify the nodes with a **ps** command
```
cirya ps

ID      Name    AS-ID
119245ee        dc1-bb9b        BB9C235805A35B6
a8a31814        dc1-e08e        BB94E62528ECB3E
```

## Load data on to the dc1 cluster

Launch a benchmark client

```
cirya -c benchmark launch 1
```
The launch command here launches containers and also starts the benchmark.

### Verfiy dc1 has shipped records to dc2

```
cirya -c dc1 asadm

Aerospike Interactive Shell, version 0.1.11

Found 2 nodes
Online:  192.168.254.1:32856, 192.168.254.1:32851

Admin> info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Network Information~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               Node               Node                    Ip        Build   Cluster        Cluster     Cluster         Principal   Rackaware   Client     Uptime
                  .                 Id                     .            .      Size            Key   Integrity                 .        Mode    Conns          .
192.168.254.1:32851   BB94E62528ECB3E    192.168.254.1:32851   E-3.13.0.2         2   6DDBCC6BFEF2   True        BB9C235805A35B6   none            11   00:03:27
192.168.254.1:32856   \*BB9C235805A35B6   192.168.254.1:32856   E-3.13.0.2         2   6DDBCC6BFEF2   True        BB9C235805A35B6   none            11   00:03:27
Number of rows: 2

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Namespace Information~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Namespace                  Node   Avail%   Evictions                 Master                Replica     Repl     Stop             Pending       Disk    Disk     HWM          Mem     Mem    HWM      Stop
        .                     .        .           .   (Objects,Tombstones)   (Objects,Tombstones)   Factor   Writes            Migrates       Used   Used%   Disk%         Used   Used%   Mem%   Writes%
        .                     .        .           .                      .                      .        .        .             (tx,rx)          .       .       .            .       .      .         .
test        192.168.254.1:32851   N/E        0.000     (496.000,  0.000)      (504.000,  0.000)      2        false    (0.000,  0.000)          N/E   N/E     50       76.172 KB   1       60     90
test        192.168.254.1:32856   N/E        0.000     (504.000,  0.000)      (496.000,  0.000)      2        false    (0.000,  0.000)          N/E   N/E     50       76.172 KB   1       60     90
test                                         0.000     (1.000 K, 0.000)       (1.000 K, 0.000)                         (0.000,  0.000)     0.000 B                    152.344 KB
Number of rows: 3

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~XDR Information~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               Node      Build        Data    Free        Lag           Req         Req       Req          Cur       Avg
                  .          .     Shipped   Dlog%      (sec)   Outstanding     Shipped   Shipped   Throughput   Latency
                  .          .           .       .          .             .     Success    Errors            .      (ms)
192.168.254.1:32851   3.13.0.2   45.047 KB     100   00:00:00       0.000     **496.000**     0.000              0         0
192.168.254.1:32856   3.13.0.2   45.773 KB     100   00:00:00       0.000     **504.000**     0.000              0         0
Number of rows: 2
```


### On dc2 run asadm to verify the data has arrived

```

cirya  -c dc2 asadm
Aerospike Interactive Shell, version 0.1.11

Found 3 nodes
Online:  192.168.254.1:32841, 192.168.254.1:32836, 192.168.254.1:32846

Admin> info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Network Information~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               Node               Node                    Ip        Build   Cluster        Cluster     Cluster         Principal   Rackaware   Client     Uptime
                  .                 Id                     .            .      Size            Key   Integrity                 .        Mode    Conns          .
192.168.254.1:32836   BB90646539C1C9E    192.168.254.1:32836   C-3.13.0.2         3   A2777CA456D8   True        BB9BA83BD3561D6   none             5   00:07:24
192.168.254.1:32841   BB988BA676E28AE    192.168.254.1:32841   C-3.13.0.2         3   A2777CA456D8   True        BB9BA83BD3561D6   none             5   00:07:24
192.168.254.1:32846   \*BB9BA83BD3561D6   192.168.254.1:32846   C-3.13.0.2         3   A2777CA456D8   True        BB9BA83BD3561D6   none             5   00:07:24
Number of rows: 3

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Namespace Information~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Namespace                  Node   Avail%   Evictions                 Master                Replica     Repl     Stop             Pending       Disk    Disk     HWM          Mem     Mem    HWM      Stop
        .                     .        .           .   (Objects,Tombstones)   (Objects,Tombstones)   Factor   Writes            Migrates       Used   Used%   Disk%         Used   Used%   Mem%   Writes%
        .                     .        .           .                      .                      .        .        .             (tx,rx)          .       .       .            .       .      .         .
test        192.168.254.1:32836   N/E        0.000     **(336.000,  0.000)**      (310.000,  0.000)      2        false    (0.000,  0.000)          N/E   N/E     50       49.207 KB   1       60     90
test        192.168.254.1:32841   N/E        0.000     **(326.000,  0.000)**      (333.000,  0.000)      2        false    (0.000,  0.000)          N/E   N/E     50       50.197 KB   1       60     90
test        192.168.254.1:32846   N/E        0.000     **(338.000,  0.000)**      (357.000,  0.000)      2        false    (0.000,  0.000)          N/E   N/E     50       52.939 KB   1       60     90
test                                         0.000     **(1.000 K, 0.000)**       (1.000 K, 0.000)                         (0.000,  0.000)     0.000 B                    152.344 KB
Number of rows: 4

```

## Break link between the clusters
You can break the link between the two clusters while running a write load and observe the lag building

```
cirya link-break -s dc1:all -d dc2:all
```

## Heal link between the clusters
You can heal the link between the two clusters while running a write load and observe the lag vanish
```
cirya link-heal -s dc1:all -d dc2:all
```

## Terminate / remove the nodes
```
cirya rma
```
