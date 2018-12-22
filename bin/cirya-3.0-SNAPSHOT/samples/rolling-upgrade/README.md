# Rolling upgrade from a non TLS version to TLS version
This example allows you to create an aerospike cluster using server version 3.14.1.8 and do a rolling upgrade of the cluster to the latest version.

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
Based on the server version and type tls is either enabled or disabled. In the
code below TLS is enabled if the server version is greater than or equal to 3.15 and it is enterprise grade.

To set up heartbeat in mesh mode, cirya provides a helper that generates mesh seeds using already launched nodes in the cluster. Cirya also generates tls config using tls helper.
For example, the highlighted line generates a single seed address using the container's dns name.
<pre>
<code>

	<#assign useTls=(serviceConfigHelper.compareVersions(serverVersion, "3.15")?number gte 0 && serverIsEnterprise)>
   ...

heartbeat {
		mode mesh
		${hbHelper.seeds(false, useTls, false, 1)}
		<#if !(onlyTls??) || onlyTls != "true">
		${hbHelper.seeds(false, false, false, 1)}
		port 3002
		</#if>

		address ethwe0
		<#if useTls>
		# tls config for heartbeat
		${tlsHelper.tlsHeartbeat()}
		</#if>
		protocol v3
		interval 150
		timeout 10
	}

   ...
</code>
</pre>

The helpers provide other methods as shown [here](https://github.com/citrusleaf/aerospike-docker-orchestrator/blob/master/src/main/java/com/aerospike/cirya/aerospike/conf/HbConfigHelper.java) and [here](https://github.com/citrusleaf/aerospike-docker-orchestrator/blob/master/src/main/java/com/aerospike/cirya/aerospike/conf/TlsConfigHelper.java).

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
tls-test-3539
tls-test-c74b
tls-test-41c2
```
This will launch 3 nodes with version 3.14.1.8

## List nodes
```
cirya ps
```

## Inspect cluster details
```
cirya execute -a 'asinfo -v statistics -l | grep cluster'
```

## Rolling upgrade script

To do rolling upgrade run rolling_upgrade.sh script present in this folder:

```
./rolling_upgrade.sh
```

Following is a snippet from rolling_upgrade.sh script.
The script iteratively upgrades all the nodes and also waits for migrations to complete between two upgrades.
```sh

function is_migrating() {
    cmd_output=$(cirya execute -a "asinfo -v statistics -l"  | grep migrate_partitions_remaining )
    num=$(echo "$cmd_output" | wc -l)
    wait=0
    if [ $num -ne $num_nodes ]
        then wait=1
    fi

    migrations=$(echo "$cmd_output" | cut -d "=" -f 2)

    while read -r line
    do
       if [ $line -ne 0 ]
       then
           wait=1
       fi
    done <<< $migrations
    echo $wait
}

num_nodes=$(cirya ps | wc -l)
num_nodes=$(($num_nodes - 1))

for (( node=0; node<$num_nodes; node++ ))
do
	echo "upgrading node $node"

	# use -p onlyTls=true to generate only tls enabled config (no non tls config)
    cirya reinstall [$node] -b https://www.aerospike.com/enterprise/download/server/latest/artifact/ubuntu16

    wait=$(is_migrating)
    echo $wait
    while [ $wait -eq 1 ]
    do
    	echo "waiting for migrations"
    	sleep 2
    	wait=$(is_migrating)
    done
done <<< $nodes


```

## Terminate / remove the nodes
```
cirya rma
```
