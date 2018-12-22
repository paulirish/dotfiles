<#if isRaw?? && isRaw>
while pgrep java; do kill -SIGTERM $(pgrep java); sleep 0.5; done
rm -f $HOME/aerospike-java-benchmark.jar
rm -f /var/log/benchmark.log
</#if>