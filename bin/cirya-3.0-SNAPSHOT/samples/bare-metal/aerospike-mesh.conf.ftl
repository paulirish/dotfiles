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
	proto-fd-max 1000
	migrate-threads 25

	# Required: docker assigns same IP and mac addresses across hosts for the default interface.
	# Need to use the weave interface to prevent duplicate nodeids.
	node-id-interface enp131s0f0

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

network {
	service {
		address enp131s0f0
		port 3000

		# Required if you plan to access the cluster from outside docker containers.
		${serviceHelper.access()}
	}

	heartbeat {
			mode mesh
			${hbHelper.seeds(false, 10)}
		    port 3002
		    address enp131s0f0

		    protocol v3
			interval 150
			timeout 10
	}

	fabric {
		port 3001
		address enp131s0f0
	}

	info {
		port 3003
		address enp131s0f0
	}
}

namespace test {
	replication-factor 1
	memory-size 400G
	storage-engine memory
}
