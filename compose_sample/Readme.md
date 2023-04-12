# DOCKER-COMPOSE-SAMPLE
In this sample, we will look at the functionality provided by docker-compose for defining and running multi-container Docker applications.

Here it's used **MySQL** like our specialized database and **node** as our platform for creating highly performant web applications.

### How to use docker-compose

In the following doc about quick tutorial that explains principal useful tools about compose. 

[DOC]: ./Howto-use-docker-compose.md



### Defining Services with Docker Compose

 A _service_ in Compose is a running container, and service definitions — which you will include in your `docker-compose.yml` file — contain information about how each container image will run. The Compose tool allows you to define multiple services to build multi-container applications.

It's important to add a tool to our project called [`wait-for`](https://github.com/Eficode/wait-for) or [wait-for-it](https://github.com/vishnubob/wait-for-it) to ensure that our application only attempts to connect to our database once the database startup tasks are complete. This wrapper script uses [`netcat`](https://www.digitalocean.com/community/tutorials/how-to-use-netcat-to-establish-and-test-tcp-and-udp-connections-on-a-vps) to poll whether or not a specific host and port are accepting TCP connections. Using it allows you to control your application’s attempts to connect to your database by testing whether or not the database is ready to accept connections.

How can we add this tool to our project? 

Compose allows you to specify dependencies between services using the [`depends_on` option](https://docs.docker.com/compose/compose-file/#depends_on), this order is based on whether or not the container is running rather than its readiness. Using `depends_on` won’t be optimal for our setup, since we want our application to connect only when the database startup tasks, including adding a user and password to the `admin` authentication database, are complete. For more information on using `wait-for` and other tools to control startup order, please see the relevant [recommendations in the Compose documentation](https://docs.docker.com/compose/startup-order/).



### Understanding somewhat about docker-compose. yml

Here our docker-compose.ymll

```yaml
	version: '3'

services:
# NODEJS SERVICE
  nodejs:
    build:
      context: ./misitio_nodejs
      dockerfile: Dockerfile
    image: nodejs
    container_name: nodejs
    restart: unless-stopped
    env_file: .env
    environment:
      - MYSQL_USER='root'
      - MYSQL_PASSWORD='student'
      - MYSQL_DATABASE='robotnikdb'
      - MYSQL_HOST=db
    ports:
      - "8000:8080"
    expose:
      # Opens port 3306 on the container
      - '3306'
    volumes:
      - .:/home/node/app
      - ./misitio_nodejs/app/serverROS:/usr/src/serverROS/
    networks:
      - app-network
    command: ./wait-for.sh db:3306 -- /usr/src/serverROS/node_modules/.bin/nodemon server.js 
# DB SERVICE
  db:
    build:
      context: ./misitio_db
      dockerfile: Dockerfile
    container_name: db
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    env_file: .env
    ports:
      # <Port exposed> : < MySQL Port running inside container>
      - '3306:3306'
    expose:
      # Opens port 3306 on the container
      - '3306'
    environment:
      - MYSQL_ROOT_PASSWORD=student 
      - MYSQL_ALLOW_EMPTY_PASSWORD=yes
    volumes:     
      - dbdata:/var/lib/mysql/
    networks:
       - app-network  

networks:
  app-network:
    driver: bridge
#Volumes
volumes:
  dbdata:
    driver: local
```

- `build`: This defines the configuration options, including the `context` and `dockerfile`, that will be applied when Compose builds the application image. If you wanted to use an existing image from a registry like [Docker Hub](https://hub.docker.com/), you could use the [`image` instruction](https://docs.docker.com/compose/compose-file/#image) instead, with information about your username, repository, and image tag.

*   `context`: This defines the build context for the image build — in this case, the current project directory.
*   `dockerfile`: This specifies the `Dockerfile` in your current project directory as the file Compose will use to build the application image.#
*   `image`, `container_name`: These apply names to the image and container.
*   `restart`: This defines the restart policy. The default is `no`, but we have set the container to restart unless it is stopped.
*   `env_file`: This tells Compose that we would like to add environment variables from a file called `.env`, located in our build context.

- `environment`: Using this option allows you to add the **MySQL** connection settings you defined in the `.env` file.

- `ports`: This maps port `8000` on the host to port `8080` on the container.

- `volumes`: We are including two types of mounts here:

  ​		**On DB service:**
  - The named volume `dbdata` will persist the data stored in MySQL's default folder data, `/data/db`. This will ensure that you don’t lose data in cases where you stop or remove containers.

    **On Nodejs service:**
    
  - The first is a [bind mount](https://docs.docker.com/storage/bind-mounts/) that mounts our application code on the host to the `/home/node/app` directory on the container. This will facilitate rapid development, since any changes you make to your host code will be populated immediately in the container.
  
  - The second is a [bind mount](https://docs.docker.com/storage/bind-mounts/) that mounts our application nodejs that include a script to copy node_modules folder inside docker when this are been created thanks to line `ENTRYPOINT ["/entrypoint.sh"]` on Dockerfile of node.
  
  Another option would be:
  
  ```
   volumes:
        - node_modules:/home/node/app/node_modules
  ```
  
  *   The opion is a named [volume](https://docs.docker.com/storage/volumes/), `node_modules`. When Docker runs the `npm install` instruction listed in the application `Dockerfile`, `npm` will create a new [`node_modules`](https://docs.npmjs.com/files/folders.html#node-modules) directory on the container that includes the packages required to run the application. The bind mount we just created will hide this newly created `node_modules` directory, however. Since `node_modules` on the host is empty, the bind will map an empty directory to the container, overriding the new `node_modules` directory and preventing our application from starting. The named `node_modules` volume solves this problem by persisting the contents of the `/home/node/app/node_modules` directory and mounting it to the container, hiding the bind.
  
  **Keep the following points in mind when using this approach**:
  
  - Your bind will mount the contents of the `node_modules` directory on the container to the host and this directory will be owned by `root`, since the named volume was created by Docker.
  - If you have a pre-existing `node_modules` directory on the host, it will override the `node_modules` directory created on the container. The setup that we’re building in this tutorial assumes that you do **not** have a pre-existing `node_modules` directory and that you won’t be working with `npm` on your host. This is in keeping with a [twelve-factor approach to application development](https://12factor.net/), which minimizes dependencies between execution environments.



- `networks`: This specifies that our application service will join the `app-network` network, which we will define at the bottom on the file.
- `command`: This option lets you set the command that should be executed when Compose runs the image. Note that this will override the `CMD` instruction that we set in our application `Dockerfile`. Here, we are running the application using the `wait-for` script, which will poll the `db` service on port `3306` to test whether or not the database service is ready. Once the readiness test succeeds, the script will execute the command we have set, `/home/node/app/node_modules/.bin/nodemon app.js`, to start the application with `nodemon`. This will ensure that any future changes we make to our code are reloaded without our having to restart the application.



**To finalize,**  the user-defined bridge network `app-network` enables communication between our containers since they are on the same Docker daemon host. This streamlines traffic and communication within the application, as it opens all ports between containers on the same bridge network, while exposing no ports to the outside world. Thus, our `db` and `nodejs` containers can communicate with each other, and we only need to expose port `8000` for front-end access to the application

Our top-level `volumes` key defines the volumes `dbdata` and `node_modules`. When Docker creates volumes, the contents of the volume are stored in a part of the host filesystem, `/var/lib/docker/volumes/`, that’s managed by Docker. The contents of each volume are stored in a directory under `/var/lib/docker/volumes/` and get mounted to any container that uses the volume. In this way, the shark information data that our users will create will persist in the `dbdata` volume even if we remove and recreate the `db` container.

