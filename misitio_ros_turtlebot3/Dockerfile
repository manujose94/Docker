FROM osrf/ros:kinetic-desktop-full-jessie
RUN apt-get update && apt-get install -y --no-install-recommends screen

RUN apt-get install -y --no-install-recommends \
ros-kinetic-joy \
ros-kinetic-teleop-twist-joy \
ros-kinetic-teleop-twist-keyboard \
ros-kinetic-laser-proc \
ros-kinetic-rgbd-launch \
ros-kinetic-depthimage-to-laserscan \
ros-kinetic-rosserial-arduino \
ros-kinetic-rosserial-python \
ros-kinetic-rosserial-server \
ros-kinetic-rosserial-client \
ros-kinetic-rosserial-msgs \
ros-kinetic-amcl \
ros-kinetic-map-server \
ros-kinetic-move-base \
ros-kinetic-urdf \
ros-kinetic-xacro \
ros-kinetic-compressed-image-transport \
ros-kinetic-rqt-image-view \
ros-kinetic-gmapping \
ros-kinetic-navigation

RUN mkdir -p /root/catkin_ws/src/ \
&& cd /root/catkin_ws/src/ \
&& git clone https://github.com/ROBOTIS-GIT/turtlebot3_msgs.git \
&& git clone https://github.com/ROBOTIS-GIT/turtlebot3.git \
&& git clone https://github.com/ROBOTIS-GIT/turtlebot3_simulations.git

RUN /bin/bash -c "source /opt/ros/kinetic/setup.bash; cd /root/catkin_ws && /opt/ros/kinetic/bin/catkin_make && /opt/ros/kinetic/bin/catkin_make -DCMAKE_INSTALL_PREFIX=/opt/ros/kinetic install"
RUN apt-get install -y --no-install-recommends vim bash-completion sudo

RUN apt-get install -y --no-install-recommends apt-utils

RUN useradd --create-home --shell /bin/bash robo
RUN echo "robo ALL=(ALL:ALL) NOPASSWD:ALL" > /etc/sudoers.d/robo && chmod 0440 /etc/sudoers.d/robo

COPY ./start_simu.sh /usr/local/bin
RUN chmod 755 /usr/local/bin/start_simu.sh

USER robo
WORKDIR /home/robo
RUN rm -rf /var/lib/apt/lists/*