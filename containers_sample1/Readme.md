# Information

**The back end: The express server**

1.  Create a file `server.js` inside the **server** folder(*ServerRos*). This will house the app’s usage of **express**, which is necessary to utilize a proper server that will listen to get and post requests:

Note that we require three packages:

*   **cors**, to enable connections and bypass the ever-so-ugly error **No ‘Access-Control-Allow-Origin’ header is present on the requested resource. Origin ‘http://localhost:8000' is therefore not allowed access.**
*   **express**,  to listen to the exposed port that enables use of a server in development mode, as well as catching the specified paths in get and post requests (such as `/test` )
*   **mysql**, to connect to the database with the credentials defined in `launch.sh` on command docker run.

**The back end: hot server load**

1.  In `package.json` , delete the `test` script and add one called `start` :

	`"start": "nodemon index.js"`

This allows for the server to reload as soon as changes are made to it, to try to keep the flow of development and viewing changes in browser as seamlessly as possible.

## Notes

**Expose**:  Expose port XXXX this just means when you run the image and you get a container that container will listen on port XXXX. This by default will just ignore all incoming request.

How to know your **MYSQL_HOST**- Note that I am using `172.17.0.2` ip-address as MYSQL_HOST. This is the IpAddress of our test-mysql-microservice container. You must replace this value to your container's ipAddress. Use `docker inspect mysql-runnig | grep IPAddress`

All containers: 

```shell
docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(docker ps -aq)
```



## Mode develop

You image that want to change something inside your **nodejs project** by default if you change when you refresh in local-host, for example, it won't change . The docker container won't reflect the new version of the file and this is because when we built the image it image a copy of  that file to see the change you'd need to rebuild the image and spin up a new container from the updated image during development this obviously a massive pain and this is where VOLUMES come in. 

So there are two types of volumes. First, When we want to persist and share data between containers, we only have one container. The second type of volumes, you share folder between the host and the container you can mount a local directory on your computer as a volume inside the container, then container it's running we'll be able to see  the files that were working on.

`-v /home/user/project/hostfolder:/src/data/containerfolder`

#### Note 

We can use the command pwd if the project is inside of where going to launch 'docker run'

`--volume=${PWD}/mysql-microservice/data:/var/lib/mysql`

#### Using VOLUME in your build process

Volumes in your image are added when you run your container, not when you build it. You should never interact with your declared volume in your build process. Rather, you should only use it when you run the container.

For example, if I create a file in my build process and use that file when I run that image, everything works fine:

```
FROM node:lastest
RUN echo "hello-world!!!!" > /myfile.txt

CMD ["cat", "/myfile.txt"]

$ docker run volume-in-build
hello-world!!!!
```

On the other hand, if I do the same thing for a file stored in a volume, it won't work.

```
FROM node:lastest
VOLUME ${PWD}/nodejs-microservice/serverROS:/data
RUN echo "hello-world!!!!" > /data/myfile.txt

CMD ["cat", "/data/myfile.txt"]

$ docker run volume-in-build
cat: can't open '/data/myfile.txt': No such file or directory
```

It's a good idea to be aware of what volumes your parent images declare.

Then, if you want to achieve to do the following points: #Points to achieve

- to install `node_modules` automatically instead of manually
- to install `node_modules` inside the Docker container instead of the host
- to have `node_modules` synchronized with the host (if I install some new package inside the Docker container, it should be synchronized with the host automatically without any manual actions

You must to take a look a at `Dockerfile`  and `entrypoint.sh`.

It's important to highlight that **ENTRYPOINT** instruction allows you to configure a container that will run as an executable and it allow to launch a Shell-script. In this case, the script copy the `node_modules` folder (it's generated during *docker build*) to folder app when docker container is launched with ***docker run***.

### List commands  ordered by time

**PWD**:  `~/Documents/worksapce/Docker_test/misitio_nodejs`

> docker build -t server-misitio .
>
> sudo ./lauch.sh
>
> docker stop nodejs-running
>
> docker start nodejs-running

In case that something has gone wrong:

1. Remove created image nodejs-running  (*If we know that the problem is caused in* `docker run`)

   > docker container rm --force nodejs-running

2. Remove created Docker images (*If we know that the problem is caused in* `docker build`, *doing points 1 and 2*)

   > docker rmi -f $(docker images -a -q)
   
3. Remove created Docker containers

   > ```shell
   > docker stop $(docker ps -a -q)
   > docker rm $(docker ps -a -q)
   > ```

It's possible to check status of our image:

> docker ps -a
>
> docker inspect id-docker
>
> docker log id-docker

When it's used `docker ps -a`:

- STATUS:  `Exited (127) 9 hours ago`  the container image is stopped
- STATUS:  `Up 10 minutes`  the container image is running

Launch file (*example nodejs image*)

> #!/bin/bash
> docker run  -d \
> --publish 8000:8000 \
> -e MYSQL_USER='root' \
> -e MYSQL_PASSWORD='123' \
> -e MYSQL_DATABASE='robotnikdb' \
> -e MYSQL_HOST='172.17.0.2' \
> --volume=${PWD}/nodejs-microservice:/usr/src/serverROS/ \
> --link mysql-running:db \
> --name=nodejs-runnig server-misitio

Nodejs image uses a persistent volume to get created node project form local directory, if it'd be want to **work with local project and changes automatically take effect inside of the docker**, it's necessary add the [option -t](https://docs.docker.com/engine/reference/commandline/run/) in the example above

Use of Prompt

It's possible to use Bash prompt of the current launched docker whit the following command:

```shell
sudo docker container exec -it $name_image bash
```

## Note

Here information, step by step how to work with this sample of containers:

[Steps](./Steps.md)