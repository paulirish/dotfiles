# Mesh single cluster example
This example allows you to create an aerospike cluster using mesh heartbeat mode and cold start.

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
For example, the highlighted line generates a single seed address using the container's dns name.
<pre>
<code>
   ...

    heartbeat {
       mode mesh
       <b>${hbHelper.seeds(true, 1)}</b>
       port 3002

       address ethwe0
       protocol v3
       interval 150
       timeout 10
    }

   ...
</code>
</pre>
The helper provides other methods as shown [here](https://github.com/citrusleaf/aerospike-docker-orchestrator/blob/master/src/main/java/com/aerospike/cirya/aerospike/conf/HbConfigHelper.java).

# Commands
You will need to run commands from this directory

### Register Image
Register required images.

**Note:** This needs to be done only once per image. Subsequent node launches for a registered image can skip the register step.
```
cirya image-register -f ../../images/Dockerfile.cirya-ubuntu-18.04 -n aerospike/cirya-ubuntu-18.04
```

## Launch nodes
```
cirya launch 3 coldstart=true
```

## List nodes
```
cirya ps
```
## Inspect cluster details
```
cirya execute-all 'asinfo -v statistics -l | grep cluster'
```
## Restart the nodes using coldstart

```
cirya restart -a coldstart=true
```

## Terminate / remove the nodes
```
cirya rma
```
