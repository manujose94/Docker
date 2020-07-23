#!/bin/bash
docker run --privileged  \
 --security-opt label=disable  \
 --security-opt seccomp=unconfined  \
 --env ROS_HOSTNAME=master \
 --env ROS_MASTER_URI=http://master:11311 \
 --env="DISPLAY" --env QT_X11_NO_MITSHM=1  \
 --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw"  \
 --volume="${PWD}/hostfolder/catkin_ws/src:/ros/catkin_ws/src"
 --name="ros_kinetic"  \
 ros_ur_gazebo  
