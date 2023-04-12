#!/bin/bash

NAME_IMAGE=nodejs-running
NAME_CONTAINER=server-misitio
runDocker(){
	docker run  -t \
	--publish 8000:8080 \
	-e MYSQL_USER='root' \
	-e MYSQL_PASSWORD='student' \
	-e MYSQL_DATABASE='robotnikdb' \
	-e MYSQL_HOST='172.17.0.2' \
	-v=${PWD}/app/serverROS:/usr/src/serverROS/ \
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
