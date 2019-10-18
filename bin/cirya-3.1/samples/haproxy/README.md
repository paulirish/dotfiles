# HA proxy example
This example demonstrates setting up HAProxy to load balance across and 
aerospike cluster. This might not be useful in practice but it demonstrates 
how you could setup an arbitrary service using cirya.

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

# Key configuration
The aerospike cluster is setup similar to the [mesh](../mesh) example.

## HAProxy
The HAProxy cluster is setup to proxy port 3000 to any one of the running 
aerospike servers.

The key configuration in [cirya.yml](./cirya.yml) for HAProxy is under the 
haproxy cluster section.
 
```yaml
  haproxy:
    type: generic
    installScript: |
      apt-get install -y haproxy

    startScript: service haproxy start
    stopScript: service haproxy stop
    statusScript: systemctl --no-page status haproxy
    templates:
      haproxy.cfg: /etc/haproxy/haproxy.cfg
    params:
      proxyToCluster: aerospike
```
Here we configure HAProxy cluster to be of type *generic* which tells cirya 
that it is not a standard aerospike cluster.
We put this cluster under the *standard-cluster* group which is configured to
run an ubuntu 18.04 image.
Note that we have set a parameter *proxyToCluster* to be the name of the 
cirya cluster "aeropsike" configured just above this cluster.
 
The installScript uses apt to install HAProxy. The start,stop and status scripts
use service and systemctl commands.

The template [haproxy.cfg](./haproxy.cfg) configures port 3000 on a HAProxy 
node to be forwarded to an aerospike node's 3000 port. This happens via a 
freemarker expressions towards the end of the file shown below. 

```yaml
.
.
.

frontend aerospike
       bind *:3000
       mode tcp
       #option tcplog
       default_backend haproxy_aerospike

backend haproxy_aerospike
       balance leastconn
       mode tcp
<#assign servers=genericHelper.getContainers(proxyToCluster)>
<#list servers as server>
       server server${server?index} ${genericHelper.publicEndpoint(server,3000)} check
</#list>

```
 
Here we get a list of nodes in the cluster referred to by the configuration 
parameter *proxyToCluster* (using genericHelper.publicEndpoint function) and 
generate a server line for each server node.

# Commands
You will need to run commands from this directory

### Register Image
Register required images.

**Note:** This needs to be done only once per image. Subsequent node launches for a registered image can skip the register step.
```
cirya image-register -f ../../images/Dockerfile.cirya-ubuntu-18.04 -n aerospike/cirya-ubuntu-18.04
```

## Launch aerospike nodes
```
cirya launch 3
```

## List aerospike nodes
```
cirya ps
```

## Inspect cluster details
```
cirya execute -a 'asinfo -v statistics -l | grep cluster'
```

## Launch HAProxy nodes
```
cirya -c haproxy launch 1
``` 

### Test the proxy
Get the public mapping for the HAProxy node's 3000 port

```bash
cirya -c haproxy inspect
Id: haproxy:d1a28345d5e6
Name: haproxy-3418
Service Id: N/A
Service Status: Running
Started: 1970-01-19T05:44:56.26
Image: aerospike/cirya-ubuntu-18.04
Host-only addresses:
Private addresses:
        172.17.0.7
Public addresses:
        192.168.5.43
Ports:
        22 -> 192.168.5.43:32807
        3000 -> 192.168.5.43:32806
        3001 -> 192.168.5.43:32805
        3002 -> 192.168.5.43:32804
        3003 -> 192.168.5.43:32803
        3010 -> 192.168.5.43:32802
        3011 -> 192.168.5.43:32801
        3012 -> 192.168.5.43:32800
```

In this run HAProxy's 3000 port is mapped to *192.168.5.43:32806*. This will 
be different for your run.

Use this public host port for asinfo to test if the proxy works

```bash
asinfo -h 192.168.5.43 -p 32806 -v node
BB9050011AC4202

asinfo -h 192.168.5.43 -p 32806 -v node
BB9040011AC4202

asinfo -h 192.168.5.43 -p 32806 -v node
BB9090011AC4202
```

We can see that different command invocations return different aerospike node-ids confirming that the proxy is
load balancing across the aerospike cluster.

## Adding more nodes to the cluster

```bash
cirya launch 2
```

## Reconfigure HAProxy to include the new nodes

```bash
cirya -c haproxy reconfigure -a
```

This command will regenerate HAProxy configuration and retstart HAProxy. 

### Check generated HAProxy configuration

```bash
cirya -c haproxy execute [0] cat /etc/haproxy/haproxy.cfg
```

This should now show a total of five server entries.

## Remove all nodes
```
cirya rma
```
