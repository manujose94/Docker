# Build:
#  docker build --pull --rm -f "Dockerfile" -t misitioros:latest "."
#
# Usage:
#  
#
# Display:
#   Give docker the rights to access the X-Server with:
#       xhost +local:docker 
#   It's must write this command before to launch docker container
# ROS_MARTER_URI: 
#           docker inspect conatiner_id -->  "IPAddress": "172.17.0.2"
#################################

FROM ros:kinetic
LABEL maintainer "Manuel Martinez"

SHELL ["/bin/bash","-c"]

# Install packages
RUN sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list' \
    && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 \
    && apt-get update \
    && apt-get install -y \
    # Basic utilities
    iputils-ping \
    # ROS bridge server and related packages
    ros-${ROS_DISTRO}-rosbridge-server \
    ros-${ROS_DISTRO}-tf2-web-republisher \
    ros-${ROS_DISTRO}-turtle-tf2 ros-${ROS_DISTRO}-tf\
    ros-${ROS_DISTRO}-tf2-tools\
    --no-install-recommends \
    # Clear apt-cache to reduce image size
    && rm -rf /var/lib/apt/lists/*

# Create local catkin workspace
ENV CATKIN_WS=/root/catkin_ws
ENV WORKSPACE_NAME=catkin_ws
RUN mkdir -p $CATKIN_WS/src
WORKDIR $CATKIN_WS/src
RUN mkdir -p /root/catkin_ws/web-test

# Initialize local catkin workspace
RUN source /opt/ros/${ROS_DISTRO}/setup.bash \
    # Update apt-get because its cache is always cleared after installs to keep image size down
    && apt-get update \
    # ROS File Server
    && git clone https://github.com/gramaziokohler/ros_file_server.git \
    # Install dependencies
    && cd $CATKIN_WS \
    && rosdep install -y --from-paths . --ignore-src --rosdistro ${ROS_DISTRO} \
    # Build catkin workspace
    && catkin_make

RUN echo "source /root/catkin_ws/devel/setup.bash" >> /root/.bashrc
EXPOSE 11311
EXPOSE 9090
EXPOSE 8001
COPY ./ros_entypoint.sh /
ENTRYPOINT ["/ros_entypoint.sh"]
CMD ["bash"]