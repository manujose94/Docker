# Quick Manual

This quick tutorial explains how to start, stop, remove, restart, and view status of docker container application using docker-compose.

docker-compose is very helpful when you are managing a complex multi container docker application.  

1. Start Docker Containers In the Background
--------------------------------------------

All the services of your application are typically defined under the docker-compose.yml file. Inside this yml file, you’ll also define all your application service dependencies.

Sometimes, you might also have a separate Dockerfile, where you’ll specify how to build a particular image.

Typically, when you execute docker-compose up, it will download and pull the appropriate image (if it is not cached locally on your server), it will then build the image using your application code, and finally start the whole docker application with all the dependencies.

To start, go to the directory where docker-compose.yml file resides, and execute the following docker-compose up command.

```
# cd /home/myapp/

# ls -l 
-rw-rw-r--. 1 root root 1288 Apr 4 09:26 docker-compose.yml
-rw-rw-r--. 1 root root  132 Apr 4 21:34 Dockerfile

# docker-compose up -d 
Creating network "myapp" with driver "overlay"
Pulling data (myrepo/mongo:latest)...
datanode: Pulling myrepo/mongo:latest... : downloaded
Creating data
..
Pulling myapp (myrepo/tomcat:latest)...
datanode: Pulling myrepo/tomcat:latest... : downloaded
Creating myapp
Building myapp
..
Pulling web (myrepo/nginx:latest)...
datanode: Pulling myrepo/nginx:latest... : downloaded
Creating web
..


```

You’ll notice that it will download the container only the 1st time when you execute it, after that, it will use the cached version. You’ll not see the “Pulling..” line in the about output anymore.

You’ll only see the following when you start the docker-compose from the next time around.

```
# docker-compose up -d 
Creating data
Creating myapp
Creating web


```

The -d options runs the docker application in the background as a daemon. This will leave the application running until you decide to stop it.

In the above example output, it has started the following services:

*   mongo for database
*   nginx for webserver
*   tomcat for application server

2. Start Docker Containers In the Foreground
--------------------------------------------

When you don’t specify the -d option, docker-compose will start all the services in the foreground.

In this case, you can see all log messages directly on the screen.

This is helpful when you are debugging any startup related issues with your docker containers, images, or services.

```
# cd /home/myapp/

# docker-compose up


```

In this case, the application will be up and running until you hit Ctrl-C to cancel the foreground process.

In this case, when you press Ctrl-C, it is equivalent to executing the “docker-compose stop”. So, it will stop all the containers gracefully.

3. Additional docker-compose Startup Options
--------------------------------------------

When you use docker-compose up, if there are any changes in the docker-compose.yml file that affects the containers, they will stopped and recreated.

But, you can force docker-compose not to stop and recreate the containers, you can use –no-recreate option as shown below during the docker-compose up. In other words, if the container already exits, this will not recreate it.

```
# docker-compose up -d --no-recreate


```

You also can do the opposite. The following will forcefully recreate the containers even if nothing in the docker-compose.yml is changed.

You can also specify the timeout value. Default value is 10 seconds, but the following command will use the time-out value of 30 seconds.

```
# docker-compose up -d -t 30


```

The following are few additional options you can use along with “docker-compose up”

*   –no-deps This will not start any linked depended services.
*   –no-build This will not build the image, even when the image is missing
*   –abort-on-container-exit This will stop all the containers if any container was stopped. You cannot use this option with -d, you have to use this option by itself.
*   –no-color In the output, this will not show any color. This will display the monochrome output on screen.

4. Stop All Docker Containers
-----------------------------

To stop a docker application that is running in the foreground, you just have to press Ctrl-C as show above.

But, to stop a docker application that is running in the background, use the docker-compose stop as shown below.

There are two steps to stop a docker application containers:

*   First, stop the running containers using docker-compose stop
*   Second, remove the stopped containers using docker-compose rm -f

Stop the application containers using docker-compose stop:

```
# cd /home/myapp/

# docker-compose stop
Stopping web ... done
Stopping data ... done
Stopping myapp ... done


```

Remove the application containers using docker-compose rm -f:

```
# cd /home/myapp/

# docker-compose rm -f
Going to remove web, data, myapp
Removing web ... done
Removing data ... done
Removing myapp ... done


```

Note: If you don’t specify -f in the above command, it will prompt you for Y/N before removing it.

Since you’ll be doing this frequently, combine both of the above stop and rm, as shown below.

In this case, since we have “&&”, which will execute the 2nd command only after the 1st command is successful. So, it will do “rm -f”, only after stopping the docker containers successfully.

```
# docker-compose stop && docker-compose rm -f
Stopping web ... done
Stopping data ... done
Stopping myapp ... done
Going to remove web, data, myapp
Removing web ... done
Removing data ... done
Removing myapp ... done


```

5. Stop a Specific Docker Container
-----------------------------------

Instead of stopping all the containers, you can also specifically stop a particular service.

The following example, will stop only the data container

```
# docker-compose stop data
Stopping data ... done


```

You can also specify a shutdown time-out during docker-compose stop. By default it will wait for 10 seconds. For some reason, if you know that your application might take little longer to stop, you may want to increase this time-out as shown below during the shutdown.

```
# docker-compose stop -t 30

# docker-compose stop data -t 30


```

6. Remove Container Volumes
---------------------------

While removing a stopped containers, it doesn’t remove all the volumes that are attached to the containers.

In a typical situation, you don’t want to remove the attached volumes during your regular stop/start/rm process.

But, if you decide to remove the attached volumes, you can do that during rm by using -v option as shown below.

The following will remove the volumes that are attached to the containers.

```
# docker-compose rm -v


```

You can also remove a specific container by specifying the container name. The following will remove only the data container.

```
# docker-compose rm -f data
Going to remove data
Removing data ... done


```

7. Status of Docker Containers
------------------------------

To view the Status of an docker application, execute the following docker-compose ps command.

```
# docker-compose ps
Name   Command               State  Ports
----------------------------------------------------------------
myapp  catalina.sh run       Up     192.168.1.2:8080->8080/tcp  
data   /usr/bin/mongod       Up     192.168.1.3:28017->27017/tcp
web    nginx -g daemon off;  Up     192.168.1.4:80->80/tcp


```

In the above output, we see that all of our three containers are running without any issue. The above output doesn’t show the container id. If you want to get an ID for a particular container, use the -q option.

The following will display the ID for the data container.

```
# docker-compose ps -q db
a6e7334b4454f65b1a45931..


```

After a docker-compose rm -f, if you execute the docker-compose ps, you’ll not see any containers listed in the output.

However, after a docker-compose stop, if you execute docker-compose ps, you’ll see empty values in the “Ports” column, and the “State” column will display Exit and the corresponding exit value of the process when it stopped.

```
# docker-compose ps
Name   Command               State      Ports
----------------------------------------------
myapp  catalina.sh run       Exit 137     
data   /usr/bin/mongod       Exit 0     
web    nginx -g daemon off;  Exit 0     


```

8. Restart Multiple Docker Containers
-------------------------------------

To summarize, if you just want to restart multiple containers that are created by docker-compose.yml file, use the following commands in sequence.

This will first stop all the containers, next remove all the containers, and finally start them in the background as specified by the docker-compose.yml file.

First, cd to the directory where docker-compose.yml file is present, and then execute the following to restart.

```
cd /home/myapp

docker-compose stop && docker-compose rm -f

docker-compose up -d 


```

