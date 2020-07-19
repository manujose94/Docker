#https://hub.docker.com/search?q=kinetic&type=image
#https://hub.docker.com/search?q=kinetic&type=image
FROM ros:kinetic-ros-base
MAINTAINER Manuel Martinez

RUN apt-get update \
    && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -q -y python-catkin-tools 
RUN apt-get install -y  python-rosdep python-wstool python-rosinstall build-essential cmake git
#WebSocket on port 9090
RUN apt-get install -y ros-kinetic-rosbridge-server
RUN sudo apt-get install -y ros-kinetic-tf2-tools
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
#http://moore-mike.com/docker-ros.html

#WORKDIR /root/catkin_ws/


ENV BOBBLE_WS=/root/catkin_ws/
RUN mkdir -p /root/catkin_ws/src
#COPY OR CREATE FOLDER PKG ROS
RUN mkdir -p /root/catkin_ws/src/web-test
#COPY src/web-test /root/catkin_ws/src/web-test

#It's not necessary to create package 'catkin_create_pkg --name std_msgs rospy ... '
# If you want that Ros deteted atumactically dependencies: catkin create pkg robot_gui_bridge --catkin-deps rosbridge_server
#ADD src $BOBBLE_WS/src
#RUN source /opt/ros/kinetic/setup.bash && \
    #cd $BOBBLE_WS/src && \
    #catkin_init_workspace && \
    #ls -l && \
    #cd $BOBBLE_WS && \
    #catkin_make && \
    #catkin_make install
EXPOSE 11311
EXPOSE 9090
# Only the name of folder
ENV WORKSPACE_NAME=catkin_ws 
RUN echo "source /root/catkin_ws/devel/setup.bash" >> /root/.bashrc
COPY ./ros_entypoint.sh /
RUN mkdir -p /root/catkin_ws/web-test2
#RUN mkdir -p /root/catkin_ws/src/web-test2
#VOLUME /root/catkin_ws/src
ENTRYPOINT ["/ros_entypoint.sh"]
CMD ["/bin/bash"]
