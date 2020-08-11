#!/bin/bash

NAME_IMAGE=misitioros:latest
NAME_CONTAINER=ros_turtleweb2

sudo docker run -it   -v ${PWD}/hostfolder/catkin_ws/src/web-test:/root/catkin_ws/src/web-test\
    -w /root/catkin_ws/src -p 9090:9090 -p 11311:11311/tcp \
    --net mynetROS -h turtleweb --ip 172.18.0.22\
    --env PORTSERVER=8001 -p 8001:8001\
    --env ROS_HOSTNAME=turtleweb \
    --env ROS_MASTER_URI=http://turtleweb:11311 \
    --privileged\
    --security-opt label=disable\
    --security-opt seccomp=unconfined\
    --env="DISPLAY" --env QT_X11_NO_MITSHM=1\
    --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw"\
    --name=$NAME_CONTAINER $NAME_IMAGE
    
