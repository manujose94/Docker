#!/bin/bash

# 1. Before to launch -> docker build -t db-misitio .

#Option volumen defined sh also it can be defined on Dockerfile or compose
# This ${PWD}/mysql-microservice/data:/var/lib/mysq helps to maintian the persitens of data, thank to the data of databse is stored in host machine instead of docker container.

NAME_IMAGE=mysql-running
NAME_CONTAINER=db-misitio
runDocker(){
	docker run -e MYSQL_ROOT_PASSWORD=student -d \
	--publish 6603:3306 \
	--volume=${PWD}/mysql-microservice/data:/var/lib/mysql \
	--name=$NAME_IMAGE $NAME_CONTAINER
}



matchingStarted=$(docker ps --filter="name=$NAME_IMAGE" -q | xargs)

if [[ -n $matchingStarted ]]; then
docker stop $matchingStarted		
echo "$NAME_IMAGE container running then stopped"
fi

matching=$(docker ps -a --filter="name=$NAME_IMAGE" -q | xargs)

if [[ -n $matching ]]; then
docker rm $matching		
echo "$NAME_IMAGE container stopped then remove it"
fi

runDocker #Run docker
