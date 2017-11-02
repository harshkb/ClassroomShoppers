-- MySQL dump 10.13  Distrib 5.6.28, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: newDatabase
-- ------------------------------------------------------
-- Server version	5.6.28-0ubuntu0.15.04.1

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
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cart` (
  `email_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`email_id`,`product_id`,`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `USER` (`email_id`),
  CONSTRAINT `Cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IndexProduct`
--

DROP TABLE IF EXISTS `IndexProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IndexProduct` (
  `type` varchar(50) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`type`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `IndexProduct_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IndexProduct`
--

LOCK TABLES `IndexProduct` WRITE;
/*!40000 ALTER TABLE `IndexProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `IndexProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `email_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_no` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`email_id`,`product_id`,`order_no`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `USER` (`email_id`),
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Product` (
  `product_id` int(11) NOT NULL,
  `Category_id` int(11) NOT NULL,
  `Subcategory_id` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `newPrice` int(11) NOT NULL,
  `oldPrice` int(11) DEFAULT NULL,
  `features` varchar(50) DEFAULT NULL,
  `isNew` tinyint(1) DEFAULT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `stock` int(11) NOT NULL,
  `smallImage` varchar(200) NOT NULL,
  `bannerImage` varchar(50) NOT NULL,
  `isAssured` tinyint(1) NOT NULL,
  `COD` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `Category_id` (`Category_id`),
  UNIQUE KEY `Subcategory_id` (`Subcategory_id`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`Category_id`) REFERENCES `category` (`Category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Region`
--

DROP TABLE IF EXISTS `Region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Region` (
  `pincode` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `deliveryDays` int(11) NOT NULL,
  `DeliveryCharges` int(11) NOT NULL,
  PRIMARY KEY (`pincode`,`seller_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `Region_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `Seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Region`
--

LOCK TABLES `Region` WRITE;
/*!40000 ALTER TABLE `Region` DISABLE KEYS */;
/*!40000 ALTER TABLE `Region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Review` (
  `product_id` int(11) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `review_id` int(11) NOT NULL,
  `raint` int(11) NOT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`,`email_id`,`review_id`),
  KEY `email_id` (`email_id`),
  CONSTRAINT `Review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`),
  CONSTRAINT `Review_ibfk_2` FOREIGN KEY (`email_id`) REFERENCES `USER` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seller`
--

DROP TABLE IF EXISTS `Seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Seller` (
  `seller_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seller`
--

LOCK TABLES `Seller` WRITE;
/*!40000 ALTER TABLE `Seller` DISABLE KEYS */;
/*!40000 ALTER TABLE `Seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sells`
--

DROP TABLE IF EXISTS `Sells`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sells` (
  `product_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`seller_id`),
  UNIQUE KEY `product_id` (`product_id`),
  UNIQUE KEY `seller_id` (`seller_id`),
  CONSTRAINT `Sells_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`),
  CONSTRAINT `Sells_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `Seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sells`
--

LOCK TABLES `Sells` WRITE;
/*!40000 ALTER TABLE `Sells` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sells` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shipping`
--

DROP TABLE IF EXISTS `Shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shipping` (
  `email_id` varchar(100) NOT NULL,
  `address_id` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `pincode` int(11) NOT NULL,
  `isdefault` bit(1) DEFAULT NULL,
  PRIMARY KEY (`email_id`,`address_id`),
  CONSTRAINT `Shipping_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `USER` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shipping`
--

LOCK TABLES `Shipping` WRITE;
/*!40000 ALTER TABLE `Shipping` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sub_Category`
--

DROP TABLE IF EXISTS `Sub_Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sub_Category` (
  `Category_id` int(11) NOT NULL,
  `Subcategory_id` int(11) NOT NULL,
  `subCategoryName` varchar(50) NOT NULL,
  `numberofproduct` int(11) NOT NULL,
  `isvisible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Category_id`,`Subcategory_id`),
  CONSTRAINT `Sub_Category_ibfk_1` FOREIGN KEY (`Category_id`) REFERENCES `category` (`Category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sub_Category`
--

LOCK TABLES `Sub_Category` WRITE;
/*!40000 ALTER TABLE `Sub_Category` DISABLE KEYS */;
INSERT INTO `Sub_Category` VALUES (1,1,'jhh',2,0),(1,2,'jha',2,0),(2,1,'jhk',2,0),(2,2,'jh9',2,0),(3,1,'jdfc',2,0),(3,2,'jdcsa',2,0);
/*!40000 ALTER TABLE `Sub_Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `email_id` varchar(100) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `second_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `isSubscribed` tinyint(1) DEFAULT '0',
  `contactNo` int(11) DEFAULT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES ('amrityavagmi@gmail.com','amritya','yagni','amritya123',0,NULL),('asd@asd.com','dsasda','asda','abcabc',0,NULL),('hkbansal1995@gmail.com','ckd','cjna','harsh123',0,NULL),('hkbansal1997','harsh','bansal','harshkb',0,NULL),('hkbansal1997@gmail.com','harsh','bansal','harshkb',0,NULL),('jcbn@fmks.com','casca','scac','harsh123',0,NULL);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `based_on_searches`
--

DROP TABLE IF EXISTS `based_on_searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `based_on_searches` (
  `email_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`email_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `based_on_searches_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `USER` (`email_id`),
  CONSTRAINT `based_on_searches_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `based_on_searches`
--

LOCK TABLES `based_on_searches` WRITE;
/*!40000 ALTER TABLE `based_on_searches` DISABLE KEYS */;
/*!40000 ALTER TABLE `based_on_searches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `Category_id` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL,
  `isVisible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Appliances',0),(2,'harsh',0),(3,'him',0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-02 19:15:58
