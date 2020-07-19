
#### Installation MYSQL 5.7 (Ubuntu 16.04 +)

```shell
sudo apt update
echo "mysql-server-5.7 mysql-server/root_password password root" | sudo debconf-set-selections
echo "mysql-server-5.7 mysql-server/root_password_again password root" | sudo debconf-set-selections
apt-get -y install mysql-server-5.7 mysql-client
```

#### User

```shell
mysql -u root -proot -e "use mysql; UPDATE user SET authentication_string=PASSWORD('$DEFMYSQLPASSWORD') WHERE User='root'; flush privileges;"
```



#### How to use a Script sql

You can execute mysql statements that have been written in a text file using the following command:

```shell
mysql -u yourusername -p yourdatabase < text_file
```

if your database has not been created yet, log into your mysql first using:

    mysql -u yourusername -p 

then:

    mysql>CREATE DATABASE a_new_database_name

then:

```shell
mysql -u yourusername -pyourpassword a_new_database_name < text_file
```

**VM UBUNTU 16.04 STUDENT**

```shell
student@ubuntu:~/serverROS_TEST/database$ mysql -u root -p  robotnikdb < robotnikdb.sql    
```

that should do it!

If we want **avoid prompt's mysql "Enter password:"** then

```shell
student@ubuntu:~/serverROS_TEST/database$ mysql -u root -pstudent  robotnikdb < robotnikdb.sql   
```

**Note**

It's showed the next message during the last command commented above:

> ERROR 1064 (42000) at line 90: You have an error in your SQL syntax;
> check the manual that corresponds to your MySQL server version for the
> right syntax to use near 'VISIBLE,

Yo must remove VISIBLE and INVISBLE words in the Script file, This is due to generate scripts with a version greater than or equal to v. 8 on MySQL and run it in an older version of Mysql

#### Once the database is create

```shell
student@ubuntu:~$ mysql -u root -p  robotnikdb
Enter password: 
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 27
Server version: 5.7.29-0ubuntu0.16.04.1 (Ubuntu)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> select * from test;
+----+-----------------+-------------------------------+---------+-------------------+---------------+
| id | name            | description                   | type    | comment           | complexity_id |
+----+-----------------+-------------------------------+---------+-------------------+---------------+
|  1 | mi_primer_test  | Test para mover linealmente   | testing | test de pruebas   |             1 |
|  2 | mi_segundo_test | Test para mover circularmente | testing | test de pruebas 2 |             1 |
+----+-----------------+-------------------------------+---------+-------------------+---------------+
2 rows in set (0.00 sec)

mysql> exit;
Bye
student@ubuntu:~$ 
```

#### Important

```mysql
START TRANSACTION;
USE `robotnikdb`;
INSERT INTO `robotnikdb`.`topic` (`id`, `id_model`, `name`, `type_message`, `rename`, `pus_sub`, `type_message_id`) VALUES (1, '0', '/turtle1/pose', 'turtlesim/Pose', 'Posicion Turtle 1', '1', 1);
INSERT INTO `robotnikdb`.`topic` (`id`, `id_model`, `name`, `type_message`, `rename`, `pus_sub`, `type_message_id`) VALUES (2, '0', '/turtle2/pose', 'turtlesim/Pose', 'Posicion Turtle 2', '1', 1);
```

If there are foreign keys like **'type_message_id'** in the comment above, must exist type_message row with the same id. In addition to this, If it can be null (x NN) , this value can write **null** like type_message_id **value**