-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: robotnikdb
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commands` (
  `id` int(11) NOT NULL,
  `order` varchar(255) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `test_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_commands_test1_idx` (`test_id`),
  CONSTRAINT `fk_commands_test1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

LOCK TABLES `commands` WRITE;
/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
INSERT INTO `commands` VALUES (1,'1','lsb_release -a',3),(2,'2','uname -a',3),(3,'3','rosversion -d',3),(4,'4','cat /proc/pcan',8);
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_optitrack`
--

DROP TABLE IF EXISTS `log_optitrack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_optitrack` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `x` double DEFAULT NULL,
  `y` double DEFAULT NULL,
  `Z` double DEFAULT NULL,
  `bodyname` varchar(65) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_optitrack`
--

LOCK TABLES `log_optitrack` WRITE;
/*!40000 ALTER TABLE `log_optitrack` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_optitrack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operario`
--

DROP TABLE IF EXISTS `operario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operario`
--

LOCK TABLES `operario` WRITE;
/*!40000 ALTER TABLE `operario` DISABLE KEYS */;
INSERT INTO `operario` VALUES (1,'Eduard'),(2,'Manuel'),(3,'Paco');
/*!40000 ALTER TABLE `operario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qa`
--

DROP TABLE IF EXISTS `qa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `succes` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qa`
--

LOCK TABLES `qa` WRITE;
/*!40000 ALTER TABLE `qa` DISABLE KEYS */;
INSERT INTO `qa` VALUES (1,'primer control de calidad',NULL);
/*!40000 ALTER TABLE `qa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result_types`
--

DROP TABLE IF EXISTS `result_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `result_types` (
  `value` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_types`
--

LOCK TABLES `result_types` WRITE;
/*!40000 ALTER TABLE `result_types` DISABLE KEYS */;
INSERT INTO `result_types` VALUES (0,'BOOL'),(1,'STRING'),(3,'DOUBLE');
/*!40000 ALTER TABLE `result_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `robot_model`
--

DROP TABLE IF EXISTS `robot_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `robot_model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `foto` varchar(200) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `supplier` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `robot_model`
--

LOCK TABLES `robot_model` WRITE;
/*!40000 ALTER TABLE `robot_model` DISABLE KEYS */;
INSERT INTO `robot_model` VALUES (2,'/summit_base',NULL,'4 ruedas','Robotnik','summit','R0b0tn1K'),(3,'/rb1_base',NULL,'base rb1','Robotnik','rb1','R0b0tn1K');
/*!40000 ALTER TABLE `robot_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `robot_model_test`
--

DROP TABLE IF EXISTS `robot_model_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `robot_model_test` (
  `robot_model_id` int(11) NOT NULL,
  `tests_id` int(11) NOT NULL,
  PRIMARY KEY (`robot_model_id`,`tests_id`),
  KEY `fk_robot_model_has_tests_tests1_idx` (`tests_id`),
  KEY `fk_robot_model_has_tests_robot_model1_idx` (`robot_model_id`),
  CONSTRAINT `fk_robot_model_has_tests_robot_model1` FOREIGN KEY (`robot_model_id`) REFERENCES `robot_model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_robot_model_has_tests_tests1` FOREIGN KEY (`tests_id`) REFERENCES `test` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `robot_model_test`
--

LOCK TABLES `robot_model_test` WRITE;
/*!40000 ALTER TABLE `robot_model_test` DISABLE KEYS */;
INSERT INTO `robot_model_test` VALUES (2,3),(3,3),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10);
/*!40000 ALTER TABLE `robot_model_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `robots_unit`
--

DROP TABLE IF EXISTS `robots_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `robots_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `robot_model_id` int(11) NOT NULL,
  `ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_robots_unit_robot_model1_idx` (`robot_model_id`),
  CONSTRAINT `fk_robots_unit_robot_model1` FOREIGN KEY (`robot_model_id`) REFERENCES `robot_model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `robots_unit`
--

LOCK TABLES `robots_unit` WRITE;
/*!40000 ALTER TABLE `robots_unit` DISABLE KEYS */;
INSERT INTO `robots_unit` VALUES (1,'robot_todoterreno_1','todoterreno de 4 ruedas','null',2,'192.168.1.13700990'),(2,'robot_rb1','brazo y base negra','158.42.165.114',3,'192.168.1.49');
/*!40000 ALTER TABLE `robots_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `type` varchar(45) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `action` varchar(45) NOT NULL,
  `launch` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (3,'Test Versión ROS y Sistema',' Verify which Ubuntu, Linux Kernel and ROS versions are installed','pythoncommands','Debe mostrar salida exitosa','auto',''),(5,'Test de velocidad angular','Command the robot at constant speed. Compare the velocity command published in the topic /robot/robotnik_base_control/cmd_vel/angular/z with the velocity published by the controller /robot/robotnik_base_control/odom_twist/twist/angular/z. Both velocities should be the same','python','','auto','rosrun test_rb1 Angular_Velocity_Check.py rb1_base'),(6,'Test de batería','Comprobar estado bateria','python','','semi','rosrun test_rb1 Safety_Relay_Check.py rb1_base'),(7,'Test de la IMU','Pixhawk ROS driver Check','python','','auto','rosrun test_rb1 Pixhawk_ROS_driver_Check.py rb1_base'),(8,'Test Versión Librería PCAN',' Check the Peak-CAN version','commands','Comparar la versión con la predefinida, almacenar el resultado y dar NO OK en el caso de que sean diferentes','auto',NULL),(9,'Test de move','Send goal to /robot/move server to check if the robot moves the desired distance (This must be checked in X axis, Y axis if it’s an omni robot and Z rotation).','python',NULL,'semi','rosrun test_rb1 Robotnik_Move.py rb1_base 1 0 0'),(10,'Test de parada de emergencia','If the robot has safety PLC, check if the software is correctly reading the different positions of the key. The values are published in /robot/safety_module/status\n1. If the safety is overridden, the safety_mode should be emergency\n2. If the safety is activated, the safety_mode should be safe','python',NULL,'semi','rosrun test_rb1 Safety_Relay_Check.py rb1_base');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests_ready`
--

DROP TABLE IF EXISTS `tests_ready`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tests_ready` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `init_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `finished` int(11) DEFAULT NULL,
  `operario_id` int(11) DEFAULT NULL,
  `test_id` int(11) NOT NULL,
  `qa_id` int(11) NOT NULL,
  `result` int(11) DEFAULT NULL,
  `related_components` varchar(105) DEFAULT NULL,
  `model_name` varchar(45) DEFAULT NULL,
  `model_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tests_ready_operario1_idx` (`operario_id`),
  KEY `fk_tests_ready_test1_idx` (`test_id`),
  KEY `fk_tests_ready_qa1_idx` (`qa_id`),
  CONSTRAINT `fk_tests_ready_operario1` FOREIGN KEY (`operario_id`) REFERENCES `operario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tests_ready_qa1` FOREIGN KEY (`qa_id`) REFERENCES `qa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tests_ready_test1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests_ready`
--

LOCK TABLES `tests_ready` WRITE;
/*!40000 ALTER TABLE `tests_ready` DISABLE KEYS */;
INSERT INTO `tests_ready` VALUES (1,'2020-06-24 12:06:31','2020-02-24 12:06:35',1,1,3,1,0,'','rb1','3'),(2,'2020-07-24 12:07:16','2020-02-24 12:07:20',1,1,3,1,0,'','summit','2'),(3,'2020-07-24 12:07:20','2020-02-24 12:07:23',1,1,3,1,0,'','summit','2'),(4,'2020-07-24 12:07:23','2020-02-24 12:07:28',1,1,3,1,0,'','summit','2'),(5,'2020-05-25 12:05:43','2020-02-25 12:05:43',1,1,5,1,0,'','rb1','3'),(6,'2020-02-25 13:43:15','2020-02-25 13:43:15',1,1,5,1,0,'','rb1','3'),(11,'2020-02-25 13:45:29','2020-02-25 13:45:29',1,1,6,1,0,'','summit','2'),(12,'2020-02-25 13:45:36','2020-02-25 13:45:36',1,1,6,1,0,'','summit','2'),(13,'2020-02-25 13:45:36','2020-02-25 13:45:36',1,1,6,1,0,'','summit','2'),(14,'2020-02-25 13:47:10','2020-02-25 13:47:10',1,1,6,1,0,'','summit','2'),(15,'2020-02-25 13:47:10','2020-02-25 13:47:10',1,1,6,1,0,'','summit','2'),(16,'2020-02-25 13:47:10','2020-02-25 13:47:10',1,1,6,1,0,'','summit','2'),(17,'2020-02-25 13:49:11','2020-02-25 13:49:11',1,1,6,1,0,'','summit','2'),(18,'2020-02-25 13:49:11','2020-02-25 13:49:11',1,1,6,1,0,'','summit','2'),(19,'2020-02-25 13:49:11','2020-02-25 13:49:11',1,1,6,1,0,'','summit','2'),(20,'2020-02-25 13:50:47','2020-02-25 13:50:47',1,1,5,1,0,'','rb1','3'),(21,'2020-02-25 13:50:47','2020-02-25 13:50:47',1,1,5,1,0,'','rb1','3'),(22,'2020-02-25 13:51:02','2020-02-25 13:51:02',1,1,5,1,0,'','rb1','3'),(23,'2020-02-25 13:51:02','2020-02-25 13:51:02',1,1,5,1,0,'','rb1','3'),(24,'2020-02-25 13:51:02','2020-02-25 13:51:02',1,1,5,1,0,'','rb1','3'),(25,'2020-02-26 09:55:52','2020-02-26 09:55:52',1,1,6,1,0,'','summit','2'),(26,'2020-02-26 09:55:57','2020-02-26 09:55:57',1,1,6,1,0,'','summit','2'),(27,'2020-02-26 09:55:58','2020-02-26 09:55:58',1,1,6,1,0,'','summit','2'),(28,'2020-02-26 09:55:59','2020-02-26 09:55:59',1,1,6,1,0,'','summit','2'),(29,'2020-02-26 10:11:47','2020-02-26 10:11:47',1,1,3,1,0,'','rb1','3'),(30,'2020-02-26 10:19:08','2020-02-26 10:19:08',1,1,5,1,0,'','rb1','3'),(31,'2020-02-26 10:41:58','2020-02-26 10:41:58',1,1,5,1,0,'','rb1','3'),(32,'2020-02-28 11:54:48','2020-02-28 11:54:48',1,1,3,1,0,'','summit','2'),(33,'2020-02-28 11:59:54','2020-02-28 11:59:54',1,1,3,1,1,'','rb1','3'),(34,'2020-02-28 12:15:24','2020-02-28 12:15:24',1,1,3,1,1,'','rb1','3'),(35,'2020-02-28 12:30:26','2020-02-28 12:30:26',1,1,3,1,1,'','rb1','3'),(36,'2020-02-28 12:36:00','2020-02-28 12:36:00',1,1,8,1,1,'','rb1','3'),(37,'2020-02-28 12:36:23','2020-02-28 12:36:23',1,1,3,1,0,'','summit','2'),(38,'2020-02-28 12:36:48','2020-02-28 12:36:48',1,1,3,1,0,'','summit','2'),(39,'2020-03-21 22:10:50','2020-03-21 22:10:50',1,1,3,1,0,'','summit','2');
/*!40000 ALTER TABLE `tests_ready` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_model` varchar(255) NOT NULL DEFAULT '0',
  `name` varchar(145) DEFAULT NULL,
  `type_message` varchar(145) DEFAULT NULL,
  `rename` varchar(45) DEFAULT NULL,
  `pus_sub` varchar(45) DEFAULT NULL,
  `type_message_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_topic_type_message1_idx` (`type_message_id`),
  CONSTRAINT `fk_topic_type_message1` FOREIGN KEY (`type_message_id`) REFERENCES `type_message` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,'0','/turtle1/pose','turtlesim/Pose','Posicion Turtle 1','1',NULL),(2,'0','/turtle2/pose','turtlesim/Pose','Posicion Turtle 2','1',NULL),(3,'3','/rb1_base/robotnik_base_hw/battery/docking_status','robotnik_msgs/BatteryDockingStatusStamped','BatteryROS','1',NULL),(4,'2','/summit_xl_controller/battery','std_msgs/Float32',NULL,NULL,NULL);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_test`
--

DROP TABLE IF EXISTS `topic_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic_test` (
  `topic_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  PRIMARY KEY (`topic_id`,`test_id`),
  KEY `fk_topic_has_test_test1_idx` (`test_id`),
  KEY `fk_topic_has_test_topic1_idx` (`topic_id`),
  CONSTRAINT `fk_topic_has_test_test1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_topic_has_test_topic1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_test`
--

LOCK TABLES `topic_test` WRITE;
/*!40000 ALTER TABLE `topic_test` DISABLE KEYS */;
INSERT INTO `topic_test` VALUES (3,5),(2,6);
/*!40000 ALTER TABLE `topic_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translatetopic`
--

DROP TABLE IF EXISTS `translatetopic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translatetopic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origin` varchar(145) NOT NULL,
  `translate` varchar(145) NOT NULL,
  `id_robot_model` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_translatetopic_robot_model` (`id_robot_model`),
  CONSTRAINT `FK_translatetopic_robot_model` FOREIGN KEY (`id_robot_model`) REFERENCES `robot_model` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translatetopic`
--

LOCK TABLES `translatetopic` WRITE;
/*!40000 ALTER TABLE `translatetopic` DISABLE KEYS */;
INSERT INTO `translatetopic` VALUES (1,'cmd_vel','/robotnik_base_control/cmd_vel',3),(2,'odom','/robotnik_base_control/odom',3),(3,'docking_battery','/robotnik_base_hw/battery/docking_status',3),(4,'battery_data','/robotnik_base_hw/battery/data',3),(5,'imu_data','/imu/data',3),(6,'calib_imu_gyro_srv','/calibrate_imu_gyro',3),(7,'move_goal','/move/goal',3),(8,'move_feedback','/move/feedback',3),(9,'move_result','/move/result',3),(10,'reset_odom_srv','/reset_odometry',3),(11,'safety_module','/safety_module/status',3);
/*!40000 ALTER TABLE `translatetopic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_message`
--

DROP TABLE IF EXISTS `type_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_message`
--

LOCK TABLES `type_message` WRITE;
/*!40000 ALTER TABLE `type_message` DISABLE KEYS */;
INSERT INTO `type_message` VALUES (1,'Pose','x:y:z');
/*!40000 ALTER TABLE `type_message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-17 11:27:55
