#https://hub.docker.com/search?q=kinetic&type=image
#https://hub.docker.com/search?q=kinetic&type=image
FROM jacknlliu/ros:kinetic-ide-init


RUN apt-get update \
    && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -q -y python-catkin-tools 

RUN catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3

RUN mkdir -p /root/catkin_ws/src
#COPY OR CREATE FOLDER PKG ROS
RUN source /opt/ros/kinetic/setup.bash && \
     cd ~/catkin_ws/src && \
     catkin_create_pkg ur-test std_msgs rospy moveit_commander && \
     cd ~/catkin_ws && \
     catkin_make && \
     catkin_make install && \
     . ~/catkin_ws/devel/setup.bash && \
     cd src/ && \
     git clone -b kinetic-devel https://github.com/ros-planning/moveit_tutorials.git && \
     git clone -b kinetic-devel https://github.com/ros-planning/panda_moveit_config.git && \
     rosdep install -y --from-paths . --ignore-src --rosdistro kinetic && \
     cd .. && \
     . ~/catkin_ws/devel/setup.bash && \
     catkin_make && \

	

EXPOSE 11311
EXPOSE 9090
# Only the name of folder
ENV WORKSPACE_NAME=catkin_ws 
RUN echo "source /root/catkin_ws/devel/setup.bash" >> /root/.bashrc
COPY ./ros_entypoint.sh /
#VOLUME /root/catkin_ws/src
ENTRYPOINT ["/ros_entypoint.sh"]
CMD ["/bin/bash"]
