# Aerospike database configuration file for deployments using mesh heartbeats.

service {
	user root
	group root
	paxos-single-replica-limit 1 # Number of nodes where the replica count is automatically reduced to 1.
	pidfile /var/run/aerospike/asd.pid
	service-threads 4
	transaction-queues 4
	transaction-threads-per-queue 4
	#transaction-retry-ms 50
	proto-fd-max 15000
	migrate-threads 25

	# Required: docker assigns same IP and mac addresses across hosts for the default interface.
	# Need to use the weave interface to prevent duplicate nodeids.
	node-id-interface ${defaultInterface}

	<#if clusterName??>
	cluster-name ${clusterName}
	</#if>
}

logging {
	# Log file must be an absolute path.
	file /var/log/aerospike/aerospike.log {
		context any info
	}
}

<#assign useTls=(serviceConfigHelper.compareVersions(serverVersion, "3.15")?number gte 0 && serverIsEnterprise)>

network {
	<#if useTls>
	# generate the tls names section
	${tlsHelper.tlsNetwork()}
	</#if>

	service {
		address any
		port 3000

		# Required if you plan to access the cluster from outside docker containers.
		${serviceHelper.access()}
		
		<#if useTls>
		# tls config for service
		${tlsHelper.tlsService(false)}
		</#if>
	}

	heartbeat {
		mode mesh
		${hbHelper.seeds(false, useTls, false, 1)}
		<#if !(onlyTls??) || onlyTls != "true">
		${hbHelper.seeds(false, false, false, 1)}
		port 3002
		</#if>

		address ${defaultInterface}
		<#if useTls>
		# tls config for heartbeat
		${tlsHelper.tlsHeartbeat()}
		</#if>
		protocol v3
		interval 150
		timeout 10
	}

	fabric {
		<#if !(onlyTls??) || onlyTls != "true">
		port 3001
		</#if>
		address ${defaultInterface}
		<#if useTls>
		# tls config for fabric
		${tlsHelper.tlsFabric()}
		</#if>
	}

	info {
		port 3003
		address ${defaultInterface}
	}
}

namespace test {
	replication-factor 2
	memory-size 400M
	storage-engine memory
}
