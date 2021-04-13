#!/bin/bash

COMMAND=${1:-start}
VERSION=${2:-latest}

# docker network create mongo-replicaset-local

REPLICASET="mongo-replicaset-local"

mkdir -pv "$(pwd)/mongo1"
mkdir -pv "$(pwd)/mongo2"
mkdir -pv "$(pwd)/mongo3"

function run-docker() {
  local name=${1}
  local port=${2}

  docker run -d                   \
    --name ${name}                \
    --net mongo-replicaset-local  \
    -p ${port}:${port}            \
    -v "$(pwd)/${name}":/data/db  \
    mongo:${VERSION}              \
    mongod --port ${port} --replSet ${REPLICASET}
}

function start-replicaset() {
  echo "Run MongoDb replicaset ${REPLICASET} with version ${VERSION}..."
  run-docker mongo1 27017
  run-docker mongo2 27018
  run-docker mongo3 27019
}

function init-replicaset() {
  start-replicaset
  echo "Let's wait some seconds before initializing the replicaset"
  sleep 3s
  docker exec -it mongo1 mongo --quiet --eval 'rs.initiate({ _id: "mongo-replicaset-local" , members: [{ _id: 1, host: "mongo1:27017", priority: 3 }, { _id: 2, host: "mongo2:27018", priority: 2 }, { _id: 3, host: "mongo3:27019", priority: 1 }] })'
  sleep 1s
  docker exec -it mongo1 mongo --quiet --eval 'rs.status()'
}

function stop-replicaset() {
  echo "Stop MongoDb replicaset ${REPLICASET}..."
  docker container rm -f mongo3 mongo2 mongo1
}

function clean-directories() {
  sudo rm -r "$(pwd)/mongo1"
  sudo rm -r "$(pwd)/mongo2"
  sudo rm -r "$(pwd)/mongo3"
}

case "${COMMAND}" in
  "init" )
    init-replicaset;;
  "start" )
    start-replicaset;;
  "stop" )
    stop-replicaset ;;
  "clean" )
    clean-directories;;
  *)
    print_error "We don't expected to update ${COMMAND}..." ;;
esac
