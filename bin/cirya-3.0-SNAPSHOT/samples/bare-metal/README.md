# Sample showing use of bare-metal/pre-provisioned machines

The example demonstrates how you could run clusters on bare-metal or pre pre-provisioned machines directly, for example for performance testing.

## Prerequisites
You need ssh access (password or key based) with sudo privileges to the bare metal machines you plan to use.
If you use key based access, and do not provide a password, the sudo needs to be passwordless.

## Update Infrastructure credentials
Make sure to update the cirya file with credentials to the bare metal machines. In case you provide a private key, make sure the user has passwordless sudo enabled.

<pre>
<code>
infrastructure:
  pools:
    server-pool:
      provider: fixed
      instances:
        192.168.200.221:
          user: cirya
          password: cirya123
          # You can use private key for authenticatio, however this requires either password to be provided or passwordless sudo to be setup on the machine.
          # privateKey: /keys/secret.pem
      instances:
        192.168.200.224:
          user: cirya
          password: cirya123

    client-pool:
      provider: fixed
        192.168.200.223:
          user: cirya
          password: cirya123
        192.168.200.222:
          user: cirya
          password: cirya123

   ...
</code>
</pre>

Here we create two pools of machines, a server pool for running aerospike with two machines and a client pool with two machines for benchmark clients.

Grouping real machines into polls allows machines with different hardware capabilities to be used for different clusters.

## Configure container groupscirya to use the machines directly

<pre>
<code>
...
containers:
  groups:
    aerospike:
      <b>type: raw</b>
      pool: server-pool

    client:
      <b>type: raw</b>
      pool: client-pool
...
</pre>
</code>

The 'raw' type for container group instructs cirya to use the bare metal machines as it instead of using docker containers.

## Cluster coonfiguration

The following cluster configuration specifies an aerospike custer and a client cluster that will run java benchmark.

<pre>
<code>
...
clusters:
 aerospike:
  # the raw machines are centos 7 - use the el7 installer.
  archivePath: https://www.aerospike.com/download/server/4.3.0.2/artifact/el7
  aerospikeConfTemplate: aerospike-mesh.conf.ftl
  params:
    hbIsMesh: true
    hbNumMeshSeeds: 100

 benchmark:
  group: client
  type: generic
  archivePath: https://drive.google.com/uc?export=download&id=1M8KV3GupoPhgyUywyy06-6mZ8eczOpzE
  installScript: file://scripts/install-benchmark.sh
  startScript: file://scripts/start-benchmark.sh.ftl
  stopScript: |
    while pgrep java; do
      pkill -SIGKILL java
      sleep 0.5
    done
  isRunningScript: pgrep java
  <b>cleanupScript: file://scripts/cleanup-benchmark.sh.ftl</b>
  params:
   logFile: /var/log/benchmark.log
   connectToCluster: aerospike
...
</pre>
</code>

Specifying a 'cleanupScript' for a cluster allows you to possible uninstall and clear disk space used when the nodes when the application is shutdown and the machines returned.

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
For bare metal machines this just means stopping the service and running the cleanup script to uninstall and or clean up disk space.
```
cirya  rma
```
