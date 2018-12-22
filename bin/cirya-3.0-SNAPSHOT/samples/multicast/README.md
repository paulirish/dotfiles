# Multicast single cluster example
This example allows you to create an aerospike cluster using mesh heartbeat mode.

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
To set up heartbeat in mesh mode, cirya provides a helper that generates mesh seeds using already launched nodes in the cluster.
For example.
<pre>
<code>
   ...

    heartbeat {
          mode multicast
          <b>multicast-group ${multicastGroup}</b>
          <b>port ${multicastPort}</b>
          address ethwe0

          protocol v3
          interval 150
          timeout 10
    }

    ...
</code>
</pre>

The highlighted line generates multicast configuration using variable set in the [cirya.conf.json](cirya.conf.json) file.
<pre>
<code>
   ...
clusters:
  multicast-test:
    archivePath: http://www.aerospike.com/download/server/latest/artifact/ubuntu16
    aerospikeConfTemplate: aerospike-multicast.conf.ftl
    params:
      clusterName: multicast-test
      multicastGroup: 239.1.1.2
      multicastPort: 5555
    ...
</code>
</pre>

# Commands
You will need to run commands from this directory

## Launch nodes
```
cirya launch 3
```
### Register Image
Register required images.

**Note:** This needs to be done only once per image. Subsequent node launches for a registered image can skip the register step.
```
cirya image-register -f ../../images/Dockerfile.cirya-ubuntu-18.04 -n aerospike/cirya-ubuntu-18.04
```

## List nodes
```
cirya ps
```

## Inspect cluster details
```
cirya execute -a 'asinfo -v statistics -l | grep cluster'
```

## Terminate / remove the nodes
```
cirya rma
```
