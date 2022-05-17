CREATE DATABASE  IF NOT EXISTS `singafood` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `singafood`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: singafood
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.36-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cuisine`
--

DROP TABLE IF EXISTS `cuisine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuisine` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of cuisine\\ne.g. 2',
  `cuisineType` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Type of cuisine\ne.g. Western, Halal, Japanese, Korean, Chinese',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Types of cuisine';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuisine`
--

LOCK TABLES `cuisine` WRITE;
/*!40000 ALTER TABLE `cuisine` DISABLE KEYS */;
INSERT INTO `cuisine` VALUES (1,'Chinese'),(2,'Western'),(3,'Fast Food'),(4,'Malay'),(5,'Indian'),(6,'Halal'),(7,'Thai'),(8,'Korean'),(9,'Japanese');
/*!40000 ALTER TABLE `cuisine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of restaurant\ne.g. 12',
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Name of restaurant\ne.g. KFC',
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Address of restaurant\ne.g. 123 Tampines St 45 #06-789 S512345',
  `region` varchar(7) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Region of restaurant (Used for regional search)\ne.g. North, South, East, West & Central',
  `priceRange` tinyint(1) NOT NULL COMMENT 'Price range of restaurant.\ne.g. 1, 2 or 3 (Displayed as $, $$ or $$$)',
  `avgRating` decimal(2,1) NOT NULL DEFAULT '0.0' COMMENT 'Rating of restaurant\\\\ne.g. 4.6',
  `totalReviews` int(11) NOT NULL DEFAULT '0',
  `contact` int(11) DEFAULT NULL COMMENT 'Contact number of restaurant\\ne.g. 67815678',
  `description` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'Information of restaurant\ne.g. We sell chicken',
  `operatinghours` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thumb` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Thumbnail of restaurant (Used in homepage/search)\ne.g. images/thumbs/12.jpg',
  `lat` double NOT NULL DEFAULT '1',
  `lng` double NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Restaurants information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'KFC (Tampines Round Market)','Blk 139 Tampines Street 11 #01-66, 521139','East',1,0.0,0,67817039,'KFC landed in Singapore in 1977, when the first restaurant opened its doors at Somerset Road.<br><br>Today KFC serves more than 1 million customers each month through over 80 stores across Singapore. This makes KFC one of the largest fast food chains in the country.<br><br>We are passionate about serving our customers freshly prepared, great tasting food with a key part of this being The Colonel\'s signature blend of 11 herbs and spices. Even today these remain a secret with the original recipe under lock and key in our headquarters in Kentucky, USA.<br>','11002200,08002200,08002200,08002200,08002200,08002200,11002200','images/restaurants/index/kfc.png',1.3459153,103.9440795),(2,'Heavenly Wang (Marina Bay)','12 Marina Boulevard, #02-01/04, Singapore 018982','South',1,0.0,0,NULL,'Heavenly Wang offers the same great taste of Wang Café\'s signature kopi and toast but with a halal range of food & beverage coupled with traditional bakery delights.','00000000,07302100,07302100,07302100,07302100,07302100,07301430','images/restaurants/index/heavenly-wang.jpg',1.2796938,103.8544419),(3,'Monster Curry (Tampines 1)','10 Tampines Central 1 #01-08/09/10 Tampines One Singapore 529536','East',2,0.0,0,65099968,'Monster Curry is the only restaurant in Singapore that serves Japanese demi-glace curry made with 14 different vegetables and spices. Our smooth and fragrant curry is the result of a 2-day rigorous cooking process.','11002000,11002000,11002000,11002000,11002000,11002000,11002000','images/restaurants/index/monster-curry.png',1.354212,103.9450352),(4,'Monster Curry (Jurong Point)','63 Jurong West Central 3 #03-57 Jurong Point 2 Singapore 648331','West',2,0.0,0,63166319,'Monster Curry is the only restaurant in Singapore that serves Japanese demi-glace curry made with 14 different vegetables and spices. Our smooth and fragrant curry is the result of a 2-day rigorous cooking process.','11002000,11002000,11002000,11002000,11002000,11002000,11002000','images/restaurants/index/monster-curry.png',1.3393411,103.7053874),(5,'Friends Tasty Korea','431 Sembawang Rd, Singapore 758396','North',2,0.0,0,NULL,'Authentic Korean restaurant in Yishun and Sembawang area. Main menu is Free Flow BBQ Buffet and variety A La Carte menues.<br><br>Delicious Korean food with reasonable price. Come and enjoy good food with comfortable ambience!!','11302300,11302300,11302300,11302300,11302300,11302300,11302300','images/restaurants/index/friends-tasty-korea.jpg',1.4280867,103.8265412),(6,'RENNthai','3D River Valley Rd, #01-05 Block D, Singapore 179023','Central',3,0.0,0,63387200,'RENNthai offers the best of Royal Thai Cuisines to its Thai food fans. It carries out its quiet mission till this day. Beside dishing out a delectable Thai Menu, RENNthai also offers a comprehensive wine list for selection. <br><br>Diners can enjoy their favourite red and white wines from our cellar while indulging in thai delicacies along the quiet riverside.','12002330,12002330,12002330,12002330,12002330,12002330,12002330','images/restaurants/index/rennthai.jpg',1.2897826,103.8456164),(7,'Seoul Garden HotPot (Changi)','5 Changi Business Park Central 1, #01-18/19, Singapore 486038','East',2,0.0,0,64446339,'If you\'re a Korean food foodie, you know that there\'s more to Korean cuisine than just KIMCHI. Seoul Garden HotPot offers an array of authentic Korean dishes like Bibim Baps, HotPot and Jjiage Sets. <br><br>With more choices of delectable items that are not only easy on the pocket, they\'re also a sure way to fill your hungry tummies! From the casual and chatty atmosphere, friendly staff and great tasting food, Seoul Garden HotPot is the perfect place for you.','11302145,11002030,11002030,11002030,11002030,11002030,11302145','images/restaurants/index/seoul-garden-hotpot.png',1.3344088,103.9629498),(8,'Neethe Restaurant','Blk 108 #01-84 Ang Mo Kio Ave 4 Singapore 560108','Central',2,0.0,0,81898143,'Come to Dining in the Neethe Restaurant in Ang Mo Kio, if you are getting bored with the regular dining experience or if you are looking for the best restaurant to impress your loved ones. <br><br>One of the most unique restaurants that you should not missed in town for a special evening especially if you are looking for the best restaurant in Singapore for a dinner.','06302100,06302100,06302100,06302100,06302100,06302100,06302100','images/restaurants/index/nethee-restaurant.png',1.3711353,103.8382408),(9,'Hai Di Lao Hot Pot (@313)','313 Orchard Road 04-23, 238895 Singapore','Central',2,0.0,0,68357227,'The brand Haidilao was founded in 1994. With over 20 years of development, Haidilao  International Holding Ltd. has become a world-renowned catering enterprise.<br><br>By June 30th 2019, Haidilao owns 593 directly-operated branch restaurants scattered globally  across China (Mainland, Hong Kong and Taiwan), Singapore, the United States of America, South Korea, Japan, Australia, Canada, the United Kingdom, Malaysia and Vietnam. It has outlets in 118 cities in Mainland  China alone.<br><br>Over the years, Haidilao has withstood the challenges of the market as well as customers, and  has successfully forged a quality hot pot brand which has earned a reputation for itself. Haidilao  combines kinds of characteristics of hot pot in many places of China. As a large-scale chain  catering enterprise with operations all over the world, Haidilao adheres to integrity in business.  It gives the highest priority to continuously improving the quality and safety of its food  products, providing more thoughtful services to its customers while delivering healthier, safer  and more nutritious food.','10300600,10300600,10300600,10300600,10300600,10300600,10300600','images/restaurants/index/hai-di-lao.jpg',1.3009333,103.8384517),(10,'Old Street Bak Kut Teh (Tiong Bahru)','302 Tiong Bahru Rd, #02-105/106 Tiong Bahru Plaza, Singapore 168732','South',2,0.0,0,98129346,'Founded in 2010, Old Street pride itself to be the local specialist in the well-loved traditional herbal pork ribs soup. Its unique East meets West approach, with its own special creation like the Old Street Dry Bak Kut Teh, freshly made You Tiao, modular extendable table with induction cooktop and iPad ordering, not only differentiated itself from competition, but also offer consumers a taste and dining experience like never before.','11002200,11002200,11002200,11002200,11002200,11002200,11002200','images/restaurants/index/old-street-bak-kut-teh.jpg',1.2863261,103.8278427);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants_images`
--

DROP TABLE IF EXISTS `restaurants_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants_images` (
  `restID` int(11) NOT NULL AUTO_INCREMENT,
  `images` varchar(512) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'images/restaurants/gallery/default.jpg',
  PRIMARY KEY (`restID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants_images`
--

LOCK TABLES `restaurants_images` WRITE;
/*!40000 ALTER TABLE `restaurants_images` DISABLE KEYS */;
INSERT INTO `restaurants_images` VALUES (1,'images/restaurants/gallery/kfc-1.jpg|images/restaurants/gallery/kfc-2.jpg|images/restaurants/gallery/kfc-3.jpg'),(2,'images/restaurants/gallery/heavenly-wang-marina-bay-1.jpg|images/restaurants/gallery/heavenly-wang-marina-bay-2.jpg'),(3,'images/restaurants/gallery/monster-curry-tampines-1-1.jpg|\nimages/restaurants/gallery/monster-curry-tampines-1-2.jpg|\nimages/restaurants/gallery/monster-curry-tampines-1-3.jpg|\nimages/restaurants/gallery/monster-curry-tampines-1-4.jpg'),(4,'images/restaurants/gallery/monster-curry-jurong-point-1.jpg'),(5,'images/restaurants/gallery/friends-korean-restaurant-1.jpg|\nimages/restaurants/gallery/friends-korean-restaurant-2.jpg'),(6,'images/restaurants/gallery/rennthai-1.jpg|\nimages/restaurants/gallery/rennthai-2.jpg|\nimages/restaurants/gallery/rennthai-3.jpg'),(7,'images/restaurants/gallery/seoul-garden-hot-pot-changi-1.jpg|\nimages/restaurants/gallery/seoul-garden-hot-pot-changi-2.jpg|\nimages/restaurants/gallery/seoul-garden-hot-pot-changi-3.jpg'),(8,'images/restaurants/gallery/neethe-restaurant-1.jpg|\nimages/restaurants/gallery/neethe-restaurant-2.jpg'),(9,'images/restaurants/gallery/hai-di-lao-313-1.jpg|\nimages/restaurants/gallery/hai-di-lao-313-2.jpg|\nimages/restaurants/gallery/hai-di-lao-313-3.jpg'),(10,'images/restaurants/gallery/old-street-bak-kut-teh-tiong-bahru-1.jpg|\nimages/restaurants/gallery/old-street-bak-kut-teh-tiong-bahru-2.jpg');
/*!40000 ALTER TABLE `restaurants_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restcuisine`
--

DROP TABLE IF EXISTS `restcuisine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restcuisine` (
  `restID` int(11) NOT NULL COMMENT 'ID of restaurant\ne.g. 12',
  `cuisineID` int(11) NOT NULL COMMENT 'ID of restaurant cuisine\ne.g. 2',
  KEY `fCompRestID` (`restID`),
  KEY `fCompCuisineID` (`cuisineID`),
  CONSTRAINT `fCompCuisineID` FOREIGN KEY (`cuisineID`) REFERENCES `cuisine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fCompRestID` FOREIGN KEY (`restID`) REFERENCES `restaurants` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Identify what cuisine is allocated to the restaurant.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restcuisine`
--

LOCK TABLES `restcuisine` WRITE;
/*!40000 ALTER TABLE `restcuisine` DISABLE KEYS */;
INSERT INTO `restcuisine` VALUES (1,2),(1,3),(1,6),(2,6),(3,9),(4,9),(6,7),(7,8),(8,4),(8,5),(8,6),(9,1),(10,1),(5,8);
/*!40000 ALTER TABLE `restcuisine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of reviews',
  `restID` int(11) NOT NULL COMMENT 'ID of restaurant\ne.g. 12',
  `userID` int(11) NOT NULL COMMENT 'ID of user reviewed\ne.g. 2',
  `comment` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'Comment of user\ne.g. The chicken is good',
  `rating` int(11) NOT NULL COMMENT 'Rating given by user\\\\ne.g. 4.2',
  `datePosted` datetime NOT NULL COMMENT 'Date of review posted\ne.g. 2019-05-30',
  PRIMARY KEY (`reviewID`),
  KEY `fReviewsRestID` (`restID`),
  KEY `fReviewsUserID` (`userID`),
  CONSTRAINT `fReviewsRestID` FOREIGN KEY (`restID`) REFERENCES `restaurants` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fReviewsUserID` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Reviews of restaurants';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of users\\ne.g. 5',
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Username\ne.g. abc646',
  `password` varchar(65) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Password\\\\\\\\ne.g. P455vv0rd!',
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Address\ne.g. Blk 456 Simei St 23 #04-567 S582347',
  `firstName` varchar(45) COLLATE utf8_unicode_ci NOT NULL COMMENT 'First Name\ne.g. Jordan',
  `lastName` varchar(45) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Last Name\ne.g. Stone',
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'E-mail\ne.g. jordan.stone@gmail.com',
  `gender` char(1) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Gender\ne.g. 0, 1 (Displayed as Male or Female)',
  `contact` int(11) NOT NULL COMMENT 'Contact\ne.g. 94374837',
  `profilePicture` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'images/users/default.png' COMMENT 'Profile Picture\\\\ne.g images/users/63.jpg',
  `resetKey` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `contact_UNIQUE` (`contact`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Information of users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'terence123','$2a$10$VrM9H3z8sTlPWBFjWO/F8O7ALV1JfMEWzeR.gdhTmw2C7aFh65/vu','21 Tampines Ave 1<br>Singapore 529757','Terence','Hau','terence.hau1996@gmail.com','1',97771694,'images/users/pepega.jpg',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-14 22:05:18
