# TLS single cluster example
This example allows you to create an aerospike cluster with inter node TLS capability.

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
The [cirya configuration file](cirya.yml) sets up a cluster "tls-test" with inter node TLS configuration.

The tls section in the tls-test cluster config defines the TLS specific details.

<pre>
<code>
   ...
    tls:
      names:
        cirya.aerospike.com:
          ca-file: certs/cacert.pem
          cert-file: certs/multi_chain.pem
          key-file: certs/key.pem
      service:
        name: cirya.aerospike.com
        tls-port: 3010
      heartbeat:
        name: cirya.aerospike.com
        tls-port: 3012
      fabric:
        name: cirya.aerospike.com
        tls-port: 3011
    params:
      clusterName: tls-test
   ...
</code>
</pre>

The names section in each tls section specifies the tls name and the path to tls certificates.
In order to use your own certificates you will have to specify the path to those certificates here.
The tls name is referred in the service, heartbeat and fabric sections with the respective tls-ports.
These sections are used to setup aerospike tls configuration.

# Key configuration
To set up tls, cirya provides a helper that generates tls specific config.
For example, the highlighted line generates network level tls config.
<pre>
<code>
   ...
   network {
        ...
	<b>${tlsHelper.tlsNetwork()}</b>

        service {
                address any
                port 3000

                # Required if you plan to access the cluster from outside docker containers.
                ${serviceHelper.access()}

                # tls config for service
                ${tlsHelper.tlsService()}
        }

        heartbeat {
                mode mesh
                ${hbHelper.seeds(false, true, 1)}
                port 3002
                address ethwe0
                # tls config for heartbeat
                ${tlsHelper.tlsHeartbeat()}
                protocol v3
                interval 150
                timeout 10
        }

        fabric {
                port 3001
                address ethwe0
                # tls config for fabric
                ${tlsHelper.tlsFabric()}
        }

   ...
</code>
</pre>
The helper provides other methods as shown [here](https://github.com/citrusleaf/aerospike-docker-orchestrator/blob/master/src/main/java/com/aerospike/cirya/aerospike/conf/TlsConfigHelper.java).

The hbHelper is responsible to generate tls seed entries. The second parameter has to be set to true to list tls seed entries.

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
cirya launch 3
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
