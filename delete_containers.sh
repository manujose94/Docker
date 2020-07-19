#!/bin/bash
docker rmi -f $(docker images -a -q)
docker stop $(docker ps -a -q)
docker rm0  $(docker ps -a -q)