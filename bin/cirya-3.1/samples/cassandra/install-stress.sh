mv ${archivePath} /tmp/apache-cassandra.tar.gz
mkdir -p /usr/local/
rm -rf /usr/local/cassandra
tar -xvf /tmp/apache-cassandra.tar.gz -C /usr/local/
ln -s /usr/local/apache-cassandra*/ /usr/local/cassandra

