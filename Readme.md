<h1 align="center">Docker examples</h1>
<h4 align="center"> Some example projects where the use of Dockers is useful to improve scalability, compatibility and some cases get rid us of some headaches. On this repository contains some small projects with Docker that can help us to give an idea of its usefulness</h4>

<p align="left"> <img src="https://komarev.com/ghpvc/?username=manujose94" alt="manujose94" /> </p>

- 🌱 I’m currently learning **Cloud computing and ROS**

- 🤔 I’m looking for help with [Docker](https://github.com/manujose94/Docker)

- 👨‍💻 All of my projects are available at [https://github.com/manujose94](https://github.com/manujose94)

- 📝 I regulary write articles on [Reddit](Reddit)

- 💬 Ask me about **ROS, javascript, mysql, node, python, dockers, java, linux services**

- 📫 How to reach me **manujose94unsc@gmail.com**

<p align="left"><img src="https://devicons.github.io/devicon/devicon.git/icons/bootstrap/bootstrap-plain.svg" alt="bootstrap" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/css3/css3-original-wordmark.svg" alt="css3" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/docker/docker-original-wordmark.svg" alt="docker" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/javascript/javascript-original.svg" alt="javascript" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/typescript/typescript-original.svg" alt="typescript" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/python/python-original-wordmark.svg" alt="python" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/linux/linux-original.svg" alt="linux" width="20" height="20"/> <img src="https://devicons.github.io/devicon/devicon.git/icons/express/express-original-wordmark.svg" alt="express" width="20" height="20"/></p><p align="center"> <img src="https://github-readme-stats.vercel.app/api?username=manujose94&show_icons=true" alt="manujose94" /> </p>

<p align="center">
<a href="https://twitter.com/@xmanuhlx" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg" alt="@xmanuhlx" height="20" width="20" /></a>
<a href="https://instagram.com/manueljose50" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg" alt="manueljose50" height="20" width="20" /></a>
</p>

### Folders

- container_sample1
- container_sample2
- **misitio_ros**
- **misitio_ros_ur** 
- compose_sample

## The container sample

This example is a sample that how to do a typical project NodeJS+Express and MYSQL based on dockers.

Furthermore, the container sample 1 already has a script launch. sh, it can be helpful  to take a look to series of commands which are written.

For more information, see inside of **container_sample1** folder.

## The composer sample

Here the same concept that above, but using docker-compose tool to improve our productivity. 

For more information, see inside of **compose_sample** folder where there are main concepts about docker-compose and how to use it.

## Another docker example with ROS

The first folder named **misitio_ros** contains a small project about ROS Kinect to provide an easier learning about ROS thanks to the integrated ROS inside of Docker and using it on your web browser.

Inside of the folder **misitio_ros_ur** there is an example that how to create and to launch a docker along with **ROS** and **Gazebo** simulator.
Due to have an insufficient time, all documents, whose content is about how to use this example, are written in Spanish language.

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
	-v=${PWD}/nodejs-microservice/serverROS:/usr/src/serverROS/ \
	--name=$NAME_IMAGE $NAME_CONTAINER
```

**Note:** A command to launch a docker based on mysql



