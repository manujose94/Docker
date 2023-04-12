<h1 align="center">Docker examples</h1>
<h4 align="center"> There are some example projects where Docker can improve scalability, compatibility, and in some cases, alleviate headaches. This repository contains some small projects that use Docker to give you an idea of its usefulness</h4>

<p align="left"> <img src="https://komarev.com/ghpvc/?username=manujose94" alt="manujose94" /> </p>

- 🌱 Learning about **Cloud computing and ROS**

- 🤔 I’m looking for help with [Docker](https://github.com/manujose94/Docker)

- 👨‍💻 All of my projects are available at [https://github.com/manujose94](https://github.com/manujose94)

- 📝 I regulary write articles on [Reddit](Reddit)

- 💬 Ask me about **ROS, javascript, mysql, node, python, dockers, java, linux services**

- 📫 How to reach me **manujose94unsc@gmail.com**

<p align="center"> <img src="https://github-readme-stats.vercel.app/api?username=manujose94&show_icons=true" alt="manujose94" /> </p>


### Folders

- [container_sample1](https://github.com/manujose94/Docker/tree/master/containers_sample1)
- [container_sample2](https://github.com/manujose94/Docker/tree/master/containers_sample2)
- **[misitio_ros](https://github.com/manujose94/Docker/tree/master/misitio_ros)**
- **[misitio_ros_ur](https://github.com/manujose94/Docker/tree/master/misitio_ros_ur)** 
- [compose_sample](https://github.com/manujose94/Docker/tree/master/compose_sample)

## The container sample

This example is a sample of how to make a typical NodeJS+Express and MYSQL project based on Docker. In addition, the "container sample 1" already has a launch.sh script, it may be useful to take a look at the series of commands that are written.

For more information, see inside the **container_sample1** folder.

## The composer sample

Here the same concept that above, but using docker-compose tool to improve our productivity. 

For more information, see inside of **compose_sample** folder where there are main concepts about docker-compose and how to use it.

## ROS and Gazebo combined with Docker

The first folder named **misitio_ros** contains a small project about ROS Kinect to provide an easier learning about ROS thanks to the integrated ROS inside of Docker and using it on your web browser.

Inside of the folder **misitio_ros_ur** there is an example that how to create and to launch a docker along with **ROS** and **Gazebo** simulator.

Due to insufficient time, all documents whose content about how to use these examples, are limited. Keep in mind that the purpose is to provide a first environment with ROS where ROS doesn't need to be installed locally.

## Get Started

### Install docker

Here official tutorial page:  [Install Docker Engine](https://docs.docker.com/engine/install/)

The Docker installation package available in the official Ubuntu repository may not be the latest version. To ensure we get the latest version, we’ll install Docker from the official Docker repository.

The next example, it's proven on Ubuntu 18.04 +

```shell
sudo apt update

#`apt` use packages over HTTPS:

sudo apt install apt-transport-https ca-certificates curl software-properties-common

#add the GPG key for the official Docker repository to your system

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

#Add the Docker repository to APT sources

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt update
```

Make sure you are about to install from the Docker repo instead of the default Ubuntu repo:

```shell
apt-cache policy docker-ce
```

So, see output like this, although the version number for Docker may be different:

```shell
docker-ce:
  Installed: (none)
  Candidate: 18.03.1~ce~3-0~ubuntu
  Version table:
     18.03.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
```



#### Executing the Docker Command Without Sudo

```shell
# add our username to the `docker` group

sudo usermod -aG docker ${USER}

# To apply the new group membership

su - ${USER}

# Confirm that our user is now added to the docker group 

id -nG

# to add a user to the docker group that we’re not logged in as, declare that username explicitly using

sudo usermod -aG docker username

```



### Install Docker Compose

You can run Compose on macOS, Windows, and 64-bit Linux. In the following link everything you need.  [Install Docker Compose](https://docs.docker.com/compose/install/)



#### Useful commands to Docker terminal:

In Linux:

```shell
echo "alias docker='sudo docker'" >> ~/.bash_aliases
```

Build:([docker docks](https://docs.docker.com/engine/reference/commandline/build/))

```
docker build -t $NAME_COINTAINER .
```

Launch: ([docker docks](https://docs.docker.com/engine/reference/commandline/run/))

```
docker run  -t --name $NAME_IMAGE $NAME_COINTAINER
```

Note: Using -it to create an interactive `bash` shell in the container

```shell
docker run  -t \
	--publish 8000:8080 \
	-e MYSQL_USER='root' \
	-e MYSQL_PASSWORD='student' \
	-e MYSQL_DATABASE='robotnikdb' \
	-e MYSQL_HOST='172.17.0.2' \
	-v=${PWD}/app/serverROS:/usr/src/serverROS/ \
	--name=$NAME_IMAGE $NAME_CONTAINER
```

**Note:** A command to launch a docker based on mysql



