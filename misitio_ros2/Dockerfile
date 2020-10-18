FROM ros:foxy

ARG DEBIAN_FRONTEND=noninteractive

SHELL ["/bin/bash", "-c"]
# install ros package
RUN apt-get update && apt-get install -y apt-utils 2> >( grep -v 'debconf: delaying package configuration, since apt-utils is not installed' >&2 ) && \ 
      apt-get install -y \
       --no-install-recommends apt-utils \
      ros-${ROS_DISTRO}-demo-nodes-cpp \
      ros-${ROS_DISTRO}-demo-nodes-py && \
    rm -rf /var/lib/apt/lists/*
RUN colcon build
# launch ros package
CMD ["ros2", "launch", "demo_nodes_py", "talker_listener.launch.py"]