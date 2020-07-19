## Docker

Some example projects where the use of dockers is useful to improve scalability and compatibility.

### Folders

- container_sample1
- container_sample2
- compose_sample

## The container sample

This example is a sample that how to do a typical project NodeJS+Express and MYSQL based on dockers.

Furthermore, the container sample 1 already has a script launch. sh, it can be helpful  to take a look to series of commands which are written.

For more information, see inside of **container_sample1** folder.

## The composer sample

Here the same concept that above, but using docker-compose tool to improve our productivity. 

For more information, see inside of **compose_sample** folder where there are main concepts about docker-compose and how to use it.



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



