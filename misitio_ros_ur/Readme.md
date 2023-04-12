# Docker with Gazebo

An example of how to use Docker to launch Gazebo together with the UR3 Simulation Robot.

### Install Docker

For installation take a look at the official site: [Install Docker Engine](https://docs.docker.com/engine/install/)

### Why Use Docker

Docker is a software platform that allows developers to create, deploy, and run applications in a containerized environment. Containers are lightweight, standalone packages of software and dependencies that can be easily moved between different computing environments.

ROS (Robot Operating System) is a popular open-source framework for building robotics applications. Docker can be used with ROS to create containerized environments that encapsulate ROS and its dependencies, making it easier to manage and deploy ROS applications.

The benefits of using Docker with ROS include:

- Portability: Docker containers can be easily moved between different computing environments, allowing ROS applications to run consistently across different hardware and operating systems.

- Isolation: Docker containers provide a high level of isolation, allowing ROS applications to run in a contained environment without interfering with other applications on the host system.

- Reproducibility: Docker containers can be easily replicated and shared, making it easier to reproduce and share ROS applications with others.

- Scalability: Docker containers can be easily scaled up or down to meet changing demand, making it easier to manage ROS applications in large-scale deployments


#### Choose and launch the docker image

Use the Docker image desired: https://github.com/jacknlliu/ros-docker-images/blob/master/README.md

For the first launch, if there isn't a Ros project yet, it is better to use the following launch command

```shell
docker run --privileged  \
 --security-opt label=disable  \
 --security-opt seccomp=unconfined  \
 --env="DISPLAY" --env QT_X11_NO_MITSHM=1  \
 --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw"  \
 --name="ros_kinetic"  \
 jacknlliu/ros:kinetic-ide-init terminator
```

docker run: This command is used to create and start a new Docker container.

- --privileged: This option gives the container full access to the host system's devices.
- --security-opt label=disable: This option disables SELinux labels, which can cause issues with some applications.

- --security-opt seccomp=unconfined: This option disables seccomp filtering, which can cause issues with some applications.

- --env="DISPLAY": This option sets the DISPLAY environment variable inside the container, which is needed for applications that use graphical user interfaces.

- --env QT_X11_NO_MITSHM=1: This option sets the QT_X11_NO_MITSHM environment variable inside the container, which is needed for some Qt-based applications.
- --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw": This option mounts the host system's X11 socket into the container, allowing graphical applications to be displayed on the host system's X server.

- --name="ros_kinetic": This option sets the name of the new container to ros_kinetic.

- jacknlliu/ros:kinetic-ide-init: This is the name and tag of the Docker image to use for the new container.

- terminator: This is the command to run inside the container. In this case, it starts the Terminator terminal emulator.


Overall, this command creates a new Docker container based on the jacknlliu/ros:kinetic-ide-init image, with full access to the host system's devices and X server, and runs the terminator command inside the container.

Once it's launched, we can use some of these examples: [move_group_python_interface_tutorial](http://docs.ros.org/kinetic/api/moveit_tutorials/html/doc/move_group_python_interface/move_group_python_interface_tutorial.html)



### List of commands inside the docker

Once launched, the next step is to install everything needed to manage UR3 using Python with the ROS communication protocol. As an example, here is a list of commands that can be used to create a project and import all the necessary dependencies:

```shell
   17  catkin_make
   18  /usr/bin/python3 --v
   19  /usr/bin/python3 -version
   20  /usr/bin/python3 --version
   21  catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3
   22  source devel/setup.bash
   23  echo $ROS_PACKAGE_PATH
   24  cd ~/catkin_ws/src
   25  catkin_create_pkg ur-test std_msgs rospy moveit_commander
   26  cd ~/catkin_ws
   27  catkin_make
   28  . ~/catkin_ws/devel/setup.bash
   29  cd src/
   30  git clone -b kinetic-devel https://github.com/ros-planning/moveit_tutorials.git
   31  git clone -b kinetic-devel https://github.com/ros-planning/panda_moveit_config.git
   32  rosdep install -y --from-paths . --ignore-src --rosdistro kinetic
   33  cd ..
   34  . ~/catkin_ws/devel/setup.bash
   35  catkin_make
```

As a result, a package has been created named "ur-test". This package is where all the code will later be added in the *ur-test/src* folder. The next step is to create launch file: [move_group_python_interface/launch](https://github.com/ros-planning/moveit_tutorials/tree/kinetic-devel/doc/move_group_python_interface/launch). This file need to be created to work.


Steps now normally followed:

1. Launch the image:

   ```shell
   docker run --privileged  \
    --security-opt label=disable  \
    --security-opt seccomp=unconfined  \
    --env="DISPLAY" --env QT_X11_NO_MITSHM=1  \
    --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw"  \
    --name="ros_kinetic"  \
    jacknlliu/ros:kinetic-ide-init terminator
   ```

   

2. To init image again from terminal:

   ```
   docker ps -a
   ```

   This command will show something like this:

   ```
   CONTAINER ID        IMAGE                                  CREATED             STATUS 
   e454ccdaec5f        jacknlliu/ros:kinetic-ide-init     37 hours ago        Exited (1)  
   NAMES  
   ros_kinetic
   ```

   Then write this two commands in terminal:

   ```
   xhost +
   ```

   ```
    docker start e454ccdaec5f
   ```

   

3. Once these commands are launched, the idea is to launch the emulator by using this command `roslaunch ur_gazebo ur3.launch`  in the terminal of the image, in this case the image with ID `e454ccdaec5f`.

4. Open another terminal in the machine and launch:  `docker exec -it ros_kinetic bash` 

5. With step 4, we are inside the Docker image, where it is possible to edit code or do all the necessary tests.It's also possible to edit the Python file locally and then copy it to the currently running Docker image.

### Screenshots

#### Launch Docker image and run it

![](https://github.com/manujose94/Docker/blob/master/misitio_ros_ur/Seleccio1.png?raw=true)

#### Launch Gazebo

![](https://github.com/manujose94/Docker/blob/master/misitio_ros_ur/Seleccio2.png?raw=true)

#### Launching another

In this image it's possible to see Gazebo and how access to inside of docker in another terminal (White Background), from which we may list newly developed or imported ROS packages.


![](https://github.com/manujose94/Docker/blob/master/misitio_ros_ur/Seleccio3.png?raw=true)

### Use custom Docker image

This Docker was created from the previous Docker image, creating the workspace and adding all the necessary libraries and packages. This means that the workspace, along with all necessary libraries and packages, are added when the workspace is created.

```shell
docker build -t ros_ur_gazebo .

sudo launch.sh
```

### Delete

If it's wished to remove the docker and the image and start again, in the terminal:

```shell
docker rmi -f $(docker images -a -q)

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

### Interesting links

- [moveit_tutorials](http://docs.ros.org/kinetic/api/moveit_tutorials/html/doc/getting_started/getting_started.html)
- [/ros-industrial/universal_robot/blob/indigo-devel](https://github.com/ros-industrial/universal_robot/blob/indigo-devel/README.md)

#### ROS AL INICIO

1. http://wiki.ros.org/catkin/Tutorials/create_a_workspace

2. http://wiki.ros.org/ROS/Tutorials/CreatingPackage

3. http://www2.ece.ohio-state.edu/~zhang/RoboticsClass/docs/ECE5463_ROSTutorialLecture1.pdf