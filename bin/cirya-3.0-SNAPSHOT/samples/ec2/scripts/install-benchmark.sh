java -version | grep 1.8

if [ "$?" -ne "0" ]; then
    apt-get update | true
    apt-get install -y openjdk-8-jre-headless
fi
mv ${archivePath} $HOME/aerospike-java-benchmark.jar
