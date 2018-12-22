# Plain containers example
This example allows you to launch plain containers with only sshd running to allow for use as generic hosts.

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

acc-e2e7
acc-73b1
acc-5c7b
```

## List nodes
```
cirya ps

ID      Name    AS-ID   IP-Addresses    Ports   Started Image
e9856f87eab9a9ef        acc-e2e7        N/A     host-only:172.18.0.2;private:10.32.0.2;public:192.168.254.1   3010->192.168.254.1:32794,3011->192.168.254.1:32793,3000->192.168.254.1:32798,22->192.168.254.1:32799,3001->192.168.254.1:32797,3003->192.168.254.1:32795,3012->192.168.254.1:32792,3002->192.168.254.1:32796   2018-05-23T13:08:04.429613561  cirya-ubuntu-18.04
b48556ba1804edb3        acc-73b1        N/A     host-only:172.18.0.3;private:10.32.0.3;public:192.168.254.1   22->192.168.254.1:32807,3001->192.168.254.1:32805,3003->192.168.254.1:32803,3012->192.168.254.1:32800,3002->192.168.254.1:32804,3010->192.168.254.1:32802,3011->192.168.254.1:32801,3000->192.168.254.1:32806   2018-05-23T13:08:06.301249278  cirya-ubuntu-18.04
a8d90805646ab50b        acc-5c7b        N/A     host-only:172.18.0.4;private:10.32.0.4;public:192.168.254.1   3010->192.168.254.1:32810,3011->192.168.254.1:32809,3003->192.168.254.1:32811,3000->192.168.254.1:32814,3002->192.168.254.1:32812,3012->192.168.254.1:32808,3001->192.168.254.1:32813,22->192.168.254.1:32815   2018-05-23T13:08:07.634027320  cirya-ubuntu-18.04

```
## SSH into the containers
```
cirya ssh [0]
```
Note the use of indices to access containers [0] refers to the first launched container,
[1] refers the second launched container and so on ...

## Get ssh details for the launched containers
```
cirya ssh-info [0] [1] [2]
[aerospike:67e7e32da178] aerospike-2b83
        Host: 192.168.254.1
        Port: 32775
        Identity: root

[aerospike:7ffd5b4d3de1] aerospike-f801
        Host: 192.168.254.1
        Port: 32783
        Identity: root

[aerospike:e7d2c59aca2c] aerospike-d762
        Host: 192.168.254.1
        Port: 32791
        Identity: root
```

## Terminate / remove the containers
```
cirya rma
```
