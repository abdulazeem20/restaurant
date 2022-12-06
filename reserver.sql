-- MySQL dump 10.13  Distrib 5.7.33, for Win64 (x86_64)
--
-- Host: localhost    Database: restaurant
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(65) DEFAULT NULL,
  `food_id` varchar(65) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `in_cart` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `food_id` (`food_id`),
  KEY `user` (`user`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,NULL,'0bf7837db1ebb1c2d6532ff1ec6c726e',1,1),(2,NULL,'0da9e759fe58c5b992dcb596f1a6bbf5',1,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` varchar(65) NOT NULL DEFAULT (md5(uuid())),
  `cat_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('1bf8a2d3b29147d7d06fee3b26d096f5','swallows'),('5200b81bff9cd1e17e8670925c11a56d','locals'),('675a805442d6e419510d85304ed435e9','drinks'),('fa630db61680aa98fad90c1efec781e1','small_chops');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foods` (
  `id` varchar(65) NOT NULL DEFAULT (md5(uuid())),
  `goods_name` varchar(30) NOT NULL,
  `cost` bigint NOT NULL,
  `image` varchar(50) NOT NULL,
  `category` varchar(65) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES ('003337b42ff889e24f5fc0211c3dc3c2','Chinchin',100,'dsflkjdl','fa630db61680aa98fad90c1efec781e1'),('0bf7837db1ebb1c2d6532ff1ec6c726e','Beans',3000,'dsflkjdl','5200b81bff9cd1e17e8670925c11a56d'),('0da9e759fe58c5b992dcb596f1a6bbf5','Rice',4000,'dsflkjdl','5200b81bff9cd1e17e8670925c11a56d'),('0e4d9e8579bdd93a77b23ec6c7772012','Bigi Apple',500,'dsflkjdl','675a805442d6e419510d85304ed435e9'),('1c1cd2d56fcdb3d20e1d6218e7367ac7','Bigi Cola',500,'dsflkjdl','675a805442d6e419510d85304ed435e9'),('24a0ee695333ba413801e237fb8b9c05','Poundo',4000,'dsflkjdl','1bf8a2d3b29147d7d06fee3b26d096f5'),('47271bd03afba927358dcd3a8da9ee28','Semolina',2000,'dsflkjdl','1bf8a2d3b29147d7d06fee3b26d096f5'),('6c0aaed182b2120266e19f5f955ece4a','Bigi Tropical',500,'dsflkjdl','675a805442d6e419510d85304ed435e9'),('9033a370f1334c976bcb78ce9baa86f6','Puff Puff',100,'dsflkjdl','fa630db61680aa98fad90c1efec781e1'),('b051d7b80dd92acc5606a2e02a1faa4b','Fried Rice',1000,'dsflkjdl','5200b81bff9cd1e17e8670925c11a56d'),('c23820d1f749b4a3f8f966f84b3596be','Eggroll',100,'dsflkjdl','fa630db61680aa98fad90c1efec781e1'),('d66d8e35c4d1c3a6e7e00e022a7521f1','Jollof Rice',1000,'dsflkjdl','5200b81bff9cd1e17e8670925c11a56d'),('ee1f875344274381db512e3982917e7f','Amala',3000,'dsflkjdl','1bf8a2d3b29147d7d06fee3b26d096f5');
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `foods_in_cart`
--

DROP TABLE IF EXISTS `foods_in_cart`;
/*!50001 DROP VIEW IF EXISTS `foods_in_cart`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `foods_in_cart` AS SELECT 
 1 AS `id`,
 1 AS `goods_name`,
 1 AS `cost`,
 1 AS `image`,
 1 AS `category`,
 1 AS `number`,
 1 AS `in_cart`,
 1 AS `user`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(65) NOT NULL DEFAULT (md5(uuid())),
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(65) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1b187427ff10fd2057b90410a30d8dbb','Mahmud','Abdul-Azeez','mahmudadeyanju03@gmail.com','password','2022-12-04 14:14:32'),('c63d85290c7cec4518a01d3576958510','Abdul-Azeem','Abdul-Azeez','abdulazeemabdulazeez@gmail.com','password','2022-12-03 23:13:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `foods_in_cart`
--

/*!50001 DROP VIEW IF EXISTS `foods_in_cart`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `foods_in_cart` AS select `f`.`id` AS `id`,`f`.`goods_name` AS `goods_name`,`f`.`cost` AS `cost`,`f`.`image` AS `image`,`f`.`category` AS `category`,`c`.`quantity` AS `number`,`c`.`in_cart` AS `in_cart`,`c`.`user` AS `user` from (`foods` `f` left join `cart` `c` on((`f`.`id` = `c`.`food_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-04 18:35:35
