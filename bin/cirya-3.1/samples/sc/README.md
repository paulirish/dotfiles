# Strong consistency client server scenarios
This example allows you to set up a namespace with strong consistency enabled and discusses the effects to client by manifesting issues.

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
The [cirya configuration file](cirya.yml) sets up two clusters running ubuntu-18.04 for illustration purposes.

The container section from the cirya file defines two container groups (aka templates for cluster). One group using an ubuntu image and the other
group using similar image with java jdk8.

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
 * aerospike - the aerospike cluster, which uses the aerospike group
 * benchmark - which runs aerospike java benchmark, this uses benchmark group

**Note:** you will have to be on US vpn to access the archivePath specified below. If VPN is not available, a local build can be provided using the following line:
 "archivePath": "file://$HOME/aerospike-server-enterprise.deb"

<pre>
<code>
...
clusters:
 aerospike:
  archivePath: https://www.aerospike.com/enterprise/download/server/latest/artifact/ubuntu16
  downloadUserName: "<insert-download-username>"
    # Use double quotes if you have special characters in the password
  downloadUserPassword: "<insert-download-password>"
  aerospikeConfTemplate: aerospike-sc.conf.ftl
  params:
    faketime: true
  copyFiles:
    features.conf: /etc/aerospike/features.conf

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

The fakeTime conf parameter starts aerospike with libfaketime to generate clock skew using skew command.

For explanation on cirya config structure and semantics refer [here](https://github.com/citrusleaf/aerospike-docker-orchestrator#configure).

## Aerospike Configuration

The template aerospike-sc.conf.ftl defines a strong consistency enabled namespace test.

<pre>
<code>
namespace test {
        replication-factor 2
        memory-size 400M
        default-ttl 1000
        <b>strong-consistency true</b>
        storage-engine device {
            file /opt/aerospike/test
        }
}
</pre>
</code>

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
cirya -c aerospike launch 5
```
Verify the nodes with a **asadm** command

```
cirya -c aerospike asadm
```

### Set Roster for namespace test
The following command will set roster to all nodes in the cluster for namespace test.

```
cirya -c aerospike roster-set -a -n test
```

Verify the roster

```
cirya -c aerospike roster-get -n test

[800d4e11] aerospike-45ff (BB9737394425886)
ns=test:roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:pending_roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:observed_nodes=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886
[a3a2a275] aerospike-5072 (BB9ABC8CFA4D1D2)
ns=test:roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:pending_roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:observed_nodes=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886
[c41bfbef] aerospike-04a1 (BB982FE6343CC3E)
ns=test:roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:pending_roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:observed_nodes=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886
[3af7a2ac] aerospike-2d3c (BB9A18BDB6DAFF2)
ns=test:roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:pending_roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:observed_nodes=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886
[303cb273] aerospike-c9c8 (BB9FD8A9CB6DBE2)
ns=test:roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:pending_roster=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886:observed_nodes=BB9FD8A9CB6DBE2,BB9ABC8CFA4D1D2,BB9A18BDB6DAFF2,BB982FE6343CC3E,BB9737394425886

```

### Launch aerospike clients

```
cirya -c benchmark launch 1
```

Verify the benchmark logs.

**Note** the tps and error counts.

Get the benchmark details
```
cirya -c benchmark ps

ID	Name	AS-ID	IP-Addresses	Ports	Started	Image
094e6f80	benchmark-5cd2	N/A	host-only:172.18.0.7;private:10.32.0.7;public:192.168.254.1	3000->192.168.254.1:32862,3002->192.168.254.1:32860,3003->192.168.254.1:32859,3011->192.168.254.1:32857,3012->192.168.254.1:32856,22->192.168.254.1:32863,3001->192.168.254.1:32861,3010->192.168.254.1:32858	2018-01-24T06:35:45.429177541	cirya-ubuntu-18.04-jdk8
```

Tail the benchmark logs

```
cirya -c benchmark execute benchmark-5cd2 tail -f /var/log/benchmark.log

2018-01-24 06:37:15.035 write(tps=21243 timeouts=0 errors=0) read(tps=21031 timeouts=0 errors=0) total(tps=42274 timeouts=0 errors=0)
2018-01-24 06:37:16.036 write(tps=19314 timeouts=0 errors=0) read(tps=19164 timeouts=0 errors=0) total(tps=38478 timeouts=0 errors=0)
2018-01-24 06:37:17.036 write(tps=21762 timeouts=0 errors=0) read(tps=22059 timeouts=0 errors=0) total(tps=43821 timeouts=0 errors=0)
2018-01-24 06:37:18.036 write(tps=25061 timeouts=0 errors=0) read(tps=25280 timeouts=0 errors=0) total(tps=50341 timeouts=0 errors=0)
2018-01-24 06:37:19.037 write(tps=25094 timeouts=0 errors=0) read(tps=25266 timeouts=0 errors=0) total(tps=50360 timeouts=0 errors=0)
2018-01-24 06:37:20.037 write(tps=25265 timeouts=0 errors=0) read(tps=24930 timeouts=0 errors=0) total(tps=50195 timeouts=0 errors=0)
2018-01-24 06:37:21.038 write(tps=23844 timeouts=0 errors=0) read(tps=23798 timeouts=0 errors=0) total(tps=47642 timeouts=0 errors=0)
2018-01-24 06:37:22.039 write(tps=23333 timeouts=0 errors=0) read(tps=23055 timeouts=0 errors=0) total(tps=46388 timeouts=0 errors=0)
2018-01-24 06:37:23.039 write(tps=23215 timeouts=0 errors=0) read(tps=23382 timeouts=0 errors=0) total(tps=46597 timeouts=0 errors=0)
2018-01-24 06:37:24.039 write(tps=22847 timeouts=0 errors=0) read(tps=23101 timeouts=0 errors=0) total(tps=45948 timeouts=0 errors=0)

```

### Verifying SC properties of aerospike

#### Writes stop on clock skew greater than 20s

##### Add a clock skew of 15s to the cluster

```
cirya -c aerospike skew-apply -a -s 15

```
Verify the skew is detected

```
cirya -c aerospike asadm

Admin> show stat like skew
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Service Statistics~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
NODE                              :   varun-MacBookPro:32822   varun-MacBookPro:32830   varun-MacBookPro:32838   varun-MacBookPro:32846   varun-MacBookPro:32854
cluster_clock_skew                :   **14999                    14998                    14999                    14999                    14999**
cluster_clock_skew_outliers       :   null                     null                     null                     null                     null
cluster_clock_skew_stop_writes_sec:   20                       20                       20                       20                       20

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~test Namespace Statistics~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
NODE                  :   varun-MacBookPro:32822   varun-MacBookPro:32830   varun-MacBookPro:32838   varun-MacBookPro:32846   varun-MacBookPro:32854
clock_skew_stop_writes:   **false                    false                    false                    false                    false**

```
The asadm ouput shows that the cluster detected a skew of 14999ms but the stop-writes is still false.

Heal the clock skew using following command.

```
cirya -c aerospike heal-skew
```

##### Add a clock skew of 25s to the cluster

The clock skew is additive, make sure you have healed the earlier clock skew to proceed.

```
cirya -c aerospike skew -s 25
```

Verify the skew is detected

```
cirya -c aerospike asadm

Admin> show stat like skew
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Service Statistics~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
NODE                              :   varun-MacBookPro:32822   varun-MacBookPro:32830   varun-MacBookPro:32838   varun-MacBookPro:32846   varun-MacBookPro:32854
cluster_clock_skew                :   **24999                    24999                    24999                    24999                    24999**
cluster_clock_skew_outliers       :   null                     null                     null                     null                     null
cluster_clock_skew_stop_writes_sec:   20                       20                       20                       20                       20

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~test Namespace Statistics~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
NODE                  :   varun-MacBookPro:32822   varun-MacBookPro:32830   varun-MacBookPro:32838   varun-MacBookPro:32846   varun-MacBookPro:32854
clock_skew_stop_writes:   **true                     true                     true                     true                     true**
```

The asadm ouput shows that the cluster detected a skew of 24999ms and the stop-writes is true now.

Verify write transactions on the client

```
cirya -c benchmark execute benchmark-5cd2 tail -f /var/log/benchmark.log

2018-01-24 07:24:40.304 write(tps=0 timeouts=0 errors=32483) read(tps=32834 timeouts=0 errors=0) total(tps=32834 timeouts=0 errors=32483)
2018-01-24 07:24:41.304 write(tps=0 timeouts=0 errors=30946) read(tps=30817 timeouts=0 errors=0) total(tps=30817 timeouts=0 errors=30946)
2018-01-24 07:24:42.304 write(tps=0 timeouts=0 errors=29865) read(tps=29570 timeouts=0 errors=0) total(tps=29570 timeouts=0 errors=29865)
2018-01-24 07:24:43.304 write(tps=0 timeouts=0 errors=30188) read(tps=30118 timeouts=0 errors=0) total(tps=30118 timeouts=0 errors=30188)
2018-01-24 07:24:44.305 write(tps=0 timeouts=0 errors=29350) read(tps=29753 timeouts=0 errors=0) total(tps=29753 timeouts=0 errors=29350)
2018-01-24 07:24:45.305 write(tps=0 timeouts=0 errors=31768) read(tps=31988 timeouts=0 errors=0) total(tps=31988 timeouts=0 errors=31768)
2018-01-24 07:24:46.305 write(tps=0 timeouts=0 errors=32142) read(tps=32117 timeouts=0 errors=0) total(tps=32117 timeouts=0 errors=32142)
2018-01-24 07:24:47.305 write(tps=0 timeouts=0 errors=32477) read(tps=32419 timeouts=0 errors=0) total(tps=32419 timeouts=0 errors=32477)
2018-01-24 07:24:48.307 write(tps=0 timeouts=0 errors=25600) read(tps=25729 timeouts=0 errors=0) total(tps=25729 timeouts=0 errors=25600)
2018-01-24 07:24:49.308 write(tps=0 timeouts=0 errors=24356) read(tps=24381 timeouts=0 errors=0) total(tps=24381 timeouts=0 errors=24356)

```
**Note** the write tps and write errors.

Heal the clock skew using following command.

```
cirya -c aerospike skew-heal
```

#### A 50-50 split of the aerospike cluster preserves availability when clients see the entire cluster

Split the aerospike cluster into two partitions
Use the following command to split the cluster into two halves.

```
cirya -c aerospike partition 50:50
ID      Name    AS-ID   IP-Addresses    Ports   Started Image
Partition 1
aerospike:bcf20ce39ed7  aerospike-96d1  BB9060552FF85BA host-only:172.18.0.7;private:10.32.0.7;public:192.168.
254.1   3011->192.168.254.1:32849,3000->192.168.254.1:32854,3002->192.168.254.1:32852,3003->192.168.254.1:3285
1,22->192.168.254.1:32855,3001->192.168.254.1:32853,3012->192.168.254.1:32848,3010->192.168.254.1:32850 1970-0
1-18T23:18:12.852       192.168.254.1:5000/aerospike/cirya-ubuntu-18.04
aerospike:b6732cefb951  aerospike-e9ba  BB93E8105AF332A host-only:172.18.0.8;private:10.32.0.8;public:192.168.
254.1   3011->192.168.254.1:32857,3000->192.168.254.1:32862,3002->192.168.254.1:32860,3003->192.168.254.1:3285
9,22->192.168.254.1:32863,3001->192.168.254.1:32861,3012->192.168.254.1:32856,3010->192.168.254.1:32858 1970-0
1-18T23:18:12.853       192.168.254.1:5000/aerospike/cirya-ubuntu-18.04

Partition 2
aerospike:35e08c24be9a  aerospike-37c8  BB94BCF2C91D7E2 host-only:172.18.0.9;private:10.32.0.9;public:192.168.
254.1   3011->192.168.254.1:32865,3000->192.168.254.1:32870,3002->192.168.254.1:32868,3003->192.168.254.1:3286
7,22->192.168.254.1:32871,3001->192.168.254.1:32869,3012->192.168.254.1:32864,3010->192.168.254.1:32866 1970-0
1-18T23:18:12.855       192.168.254.1:5000/aerospike/cirya-ubuntu-18.04
aerospike:aebdde7ef07e  aerospike-4ea3  BB96FEF270839D6 host-only:172.18.0.10;private:10.32.0.10;public:192.16
8.254.1 3011->192.168.254.1:32873,3000->192.168.254.1:32878,3002->192.168.254.1:32876,3003->192.168.254.1:3287
5,22->192.168.254.1:32879,3001->192.168.254.1:32877,3012->192.168.254.1:32872,3010->192.168.254.1:32874 1970-0
1-18T23:18:12.856       192.168.254.1:5000/aerospike/cirya-ubuntu-18.04
aerospike:0cb75bad5dc5  aerospike-49f1  BB90540CF935EEE host-only:172.18.0.11;private:10.32.0.11;public:192.16
8.254.1 3011->192.168.254.1:32881,3000->192.168.254.1:32886,3002->192.168.254.1:32884,3003->192.168.254.1:3288
3,22->192.168.254.1:32887,3001->192.168.254.1:32885,3012->192.168.254.1:32880,3010->192.168.254.1:32882 1970-0
1-18T23:18:12.858       192.168.254.1:5000/aerospike/cirya-ubuntu-18.04
```
Check the cluster state.

```
cirya -c aerospike execute -a 'asinfo -v statistics -l | grep cluster_size'

[c41bfbef] aerospike-04a1: SUCCESS
Stdout:
cluster_size=2

[800d4e11] aerospike-45ff: SUCCESS
Stdout:
cluster_size=3

[a3a2a275] aerospike-5072: SUCCESS
Stdout:
cluster_size=2

[303cb273] aerospike-c9c8: SUCCESS
Stdout:
cluster_size=3

[3af7a2ac] aerospike-2d3c: SUCCESS
Stdout:
cluster_size=3
```

Check for disruptions on the client side. Ideally the client should not see any errors and the tps should be similar.

```
cirya -c benchmark execute benchmark-5cd2 tail -f /var/log/benchmark.log
2018-01-24 07:28:20.369 write(tps=23456 timeouts=0 errors=0) read(tps=23541 timeouts=0 errors=0) total(tps=46997 timeouts=0 errors=0)
2018-01-24 07:28:21.369 write(tps=24709 timeouts=0 errors=0) read(tps=24472 timeouts=0 errors=0) total(tps=49181 timeouts=0 errors=0)
2018-01-24 07:28:22.369 write(tps=25422 timeouts=0 errors=0) read(tps=25041 timeouts=0 errors=0) total(tps=50463 timeouts=0 errors=0)
2018-01-24 07:28:23.369 write(tps=24939 timeouts=0 errors=0) read(tps=25162 timeouts=0 errors=0) total(tps=50101 timeouts=0 errors=0)
2018-01-24 07:28:24.370 write(tps=25284 timeouts=0 errors=0) read(tps=25100 timeouts=0 errors=0) total(tps=50384 timeouts=0 errors=0)
2018-01-24 07:28:25.370 write(tps=23991 timeouts=0 errors=0) read(tps=23847 timeouts=0 errors=0) total(tps=47838 timeouts=0 errors=0)
2018-01-24 07:28:26.370 write(tps=23258 timeouts=0 errors=0) read(tps=23417 timeouts=0 errors=0) total(tps=46675 timeouts=0 errors=0)
2018-01-24 07:28:27.370 write(tps=23477 timeouts=0 errors=0) read(tps=23689 timeouts=0 errors=0) total(tps=47166 timeouts=0 errors=0)
2018-01-24 07:28:28.370 write(tps=21551 timeouts=0 errors=0) read(tps=20939 timeouts=0 errors=0) total(tps=42490 timeouts=0 errors=0)
2018-01-24 07:28:29.371 write(tps=19221 timeouts=0 errors=0) read(tps=19229 timeouts=0 errors=0) total(tps=38450 timeouts=0 errors=0)
```
**Note** the tps is similar to the initial tps.

#### A 50-50 split of the aerospike cluster losses availability when clients cannot see the entire cluster

Break the link between clients and the majority side of the cluster.

```
cirya link-break -d aerospike:35e08c24be9a,aerospike:aebdde7ef07,aerospike:aebdde7ef07 -s benchmark:all
```

Verify the client state

```
cirya -c benchmark execute benchmark-5cd2 tail -f /var/log/benchmark.log
2018-01-24 07:31:06.317 INFO Thread tend Remove node BB9737394425886 192.168.254.1 32830
2018-01-24 07:31:06.317 INFO Thread tend Remove node BB9A18BDB6DAFF2 192.168.254.1 32838
2018-01-24 07:31:06.317 INFO Thread tend Remove node BB9FD8A9CB6DBE2 192.168.254.1 32854
2018-01-24 07:31:06.416 write(tps=5971 timeouts=0 errors=0) read(tps=5905 timeouts=0 errors=0) total(tps=11876 timeouts=0 errors=0)
2018-01-24 07:31:07.416 write(tps=15182 timeouts=0 errors=144875) read(tps=15224 timeouts=0 errors=144832) total(tps=30406 timeouts=0 errors=289707)
2018-01-24 07:31:08.416 write(tps=19929 timeouts=0 errors=188704) read(tps=19726 timeouts=0 errors=188012) total(tps=39655 timeouts=0 errors=376716)
2018-01-24 07:31:09.418 write(tps=18232 timeouts=0 errors=173543) read(tps=18286 timeouts=0 errors=173893) total(tps=36518 timeouts=0 errors=347436)
2018-01-24 07:31:10.418 write(tps=17998 timeouts=0 errors=173079) read(tps=18189 timeouts=0 errors=172858) total(tps=36187 timeouts=0 errors=345937)
2018-01-24 07:31:11.418 write(tps=17741 timeouts=0 errors=168995) read(tps=17706 timeouts=0 errors=169391) total(tps=35447 timeouts=0 errors=338386)
2018-01-24 07:31:12.418 write(tps=14565 timeouts=0 errors=141230) read(tps=14850 timeouts=0 errors=140499) total(tps=29415 timeouts=0 errors=281729)
2018-01-24 07:31:13.418 write(tps=15491 timeouts=0 errors=149630) read(tps=15619 timeouts=0 errors=149700) total(tps=31110 timeouts=0 errors=299330)
2018-01-24 07:31:14.419 write(tps=19539 timeouts=0 errors=185638) read(tps=19373 timeouts=0 errors=185179) total(tps=38912 timeouts=0 errors=370817)
```
**Note** the errors.

#### Clean up nodes
```
cirya rma
```
