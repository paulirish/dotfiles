#!/bin/bash
<#assign seeds=genericHelper.getContainers("cassandra")>
 <#assign seedList="">
 <#list seeds as seed>
  <#assign seedList += seed.privateAddresses[0]>
  <#if seed_has_next>
   <#assign seedList += ",">
  </#if>
 </#list>

set -m
/usr/bin/nohup /usr/local/cassandra/tools/bin/cassandra-stress ${command} n=10000 -node ${seedList} &> ${logFile!"/var/log/stress.log"} &
