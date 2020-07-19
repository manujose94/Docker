# Use Node v8 as the base image.
FROM node:8.17
# Create and define the node_modules's cache directory.
# Points to achieve
RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./app/serverROS/package*.json ./
RUN npm install
# Create and define the application's working directory.
RUN mkdir -p /usr/src/serverROS
WORKDIR /usr/src/serverROS
# Copy app source from current host directory to container working directory
#Entry
COPY ./entrypoint.sh /
RUN ls /
ENTRYPOINT ["/entrypoint.sh"]
# Run app -t
#CMD ["npm", "start"]









