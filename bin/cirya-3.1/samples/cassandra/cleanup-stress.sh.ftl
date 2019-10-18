<#if isRaw?? && isRaw>
pkill -9 java
rm -rf /usr/local/apache*
rm -rf /usr/local/cassandra
rm -rf /var/log/stress.log

# maybe clear storage is disk is used
</#if>
