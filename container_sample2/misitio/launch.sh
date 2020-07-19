#!/bin/bash
sudo docker run -it   -v ${PWD}/hostfolder/catkin_ws/src:/root/catkin_ws/src -w /root/catkin_ws/src -p 9090:9090 \
    --net foo \
    --name master30 \
    --env ROS_HOSTNAME=master \
    --env ROS_MASTER_URI=http://master:11311 \
    ros-misitio3 \
    
