## Pull the mysql:5.7 image
FROM mysql:5.7.29
#Environment Variables
ENV MYSQL_ROOT_PASSWORD=student \  
    MYSQL_DATABASE=robotnikdb \ 
    MYSQL_USER=users_service  \
    MYSQL_PASSWORD=student \
    MYSQL_ALLOW_EMPTY_PASSWORD=yes

# When container will be started, we'll have `robotnikdb` database created with this schema
ADD setup.sql /docker-entrypoint-initdb.d
