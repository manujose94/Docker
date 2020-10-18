#!/bin/bash
#https://stackoverflow.com/questions/48248443/best-way-to-install-ros-simulation-for-turtle-bot-3-with-docker-for-debianbuste
#https://github.com/osrf/rvizweb
screen -dmS turtlebot_fake /bin/bash -c "source /opt/ros/kinetic/setup.bash;env TURTLEBOT3_MODEL=burger roslaunch turtlebot3_fake turtlebot3_fake.launch"

sleep 2

screen -S turtlebot_fake -X screen /bin/bash -c "source /opt/ros/kinetic/setup.bash;env TURTLEBOT3_MODEL=burger roslaunch turtlebot3_teleop turtlebot3_teleop_key.launch"

source "/opt/ros/$ROS_DISTRO/setup.bash"
exec "/bin/bash"