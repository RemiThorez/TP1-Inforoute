-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_gestion_rdv
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Token',7,'add_token'),(26,'Can change Token',7,'change_token'),(27,'Can delete Token',7,'delete_token'),(28,'Can view Token',7,'view_token'),(29,'Can add Token',8,'add_tokenproxy'),(30,'Can change Token',8,'change_tokenproxy'),(31,'Can delete Token',8,'delete_tokenproxy'),(32,'Can view Token',8,'view_tokenproxy'),(33,'Can add client',9,'add_client'),(34,'Can change client',9,'change_client'),(35,'Can delete client',9,'delete_client'),(36,'Can view client',9,'view_client'),(37,'Can add mecanicien',10,'add_mecanicien'),(38,'Can change mecanicien',10,'change_mecanicien'),(39,'Can delete mecanicien',10,'delete_mecanicien'),(40,'Can view mecanicien',10,'view_mecanicien'),(41,'Can add rendezvous',11,'add_rendezvous'),(42,'Can change rendezvous',11,'change_rendezvous'),(43,'Can delete rendezvous',11,'delete_rendezvous'),(44,'Can view rendezvous',11,'view_rendezvous'),(45,'Can add vehicule',12,'add_vehicule'),(46,'Can change vehicule',12,'change_vehicule'),(47,'Can delete vehicule',12,'delete_vehicule'),(48,'Can view vehicule',12,'view_vehicule');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$870000$hOD4nAvYwLMSlXiMyi29eH$cqDRQOt9ELxo3yzyyj+DfgpmTSzY5lEVbq70g2131gw=',NULL,0,'string','string','string','user@example.com',0,1,'2024-12-24 21:03:18.631748');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('8c352415bd46fededa18f298efce10f303b76a16','2024-12-24 21:06:48.094481',1);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_client`
--

DROP TABLE IF EXISTS `client_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tel` varchar(50) NOT NULL,
  `adresse` varchar(254) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `client_client_user_id_cdce0c20_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_client`
--

LOCK TABLES `client_client` WRITE;
/*!40000 ALTER TABLE `client_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'authtoken','token'),(8,'authtoken','tokenproxy'),(9,'client','client'),(5,'contenttypes','contenttype'),(10,'mecanicien','mecanicien'),(11,'rendezvous','rendezvous'),(6,'sessions','session'),(12,'vehicule','vehicule');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-12-24 21:00:59.910873'),(2,'auth','0001_initial','2024-12-24 21:01:00.288463'),(3,'admin','0001_initial','2024-12-24 21:01:00.379445'),(4,'admin','0002_logentry_remove_auto_add','2024-12-24 21:01:00.384369'),(5,'admin','0003_logentry_add_action_flag_choices','2024-12-24 21:01:00.389174'),(6,'contenttypes','0002_remove_content_type_name','2024-12-24 21:01:00.443989'),(7,'auth','0002_alter_permission_name_max_length','2024-12-24 21:01:00.493680'),(8,'auth','0003_alter_user_email_max_length','2024-12-24 21:01:00.509532'),(9,'auth','0004_alter_user_username_opts','2024-12-24 21:01:00.518344'),(10,'auth','0005_alter_user_last_login_null','2024-12-24 21:01:00.563707'),(11,'auth','0006_require_contenttypes_0002','2024-12-24 21:01:00.565382'),(12,'auth','0007_alter_validators_add_error_messages','2024-12-24 21:01:00.570589'),(13,'auth','0008_alter_user_username_max_length','2024-12-24 21:01:00.610244'),(14,'auth','0009_alter_user_last_name_max_length','2024-12-24 21:01:00.654466'),(15,'auth','0010_alter_group_name_max_length','2024-12-24 21:01:00.666456'),(16,'auth','0011_update_proxy_permissions','2024-12-24 21:01:00.671987'),(17,'auth','0012_alter_user_first_name_max_length','2024-12-24 21:01:00.714562'),(18,'authtoken','0001_initial','2024-12-24 21:01:00.769980'),(19,'authtoken','0002_auto_20160226_1747','2024-12-24 21:01:00.785824'),(20,'authtoken','0003_tokenproxy','2024-12-24 21:01:00.787775'),(21,'authtoken','0004_alter_tokenproxy_options','2024-12-24 21:01:00.791456'),(22,'client','0001_initial','2024-12-24 21:01:00.844375'),(23,'mecanicien','0001_initial','2024-12-24 21:01:00.907890'),(24,'vehicule','0001_initial','2024-12-24 21:01:00.962970'),(25,'rendezvous','0001_initial','2024-12-24 21:01:01.060176'),(26,'rendezvous','0002_rendezvous_estpayer_alter_rendezvous_commentaire_and_more','2024-12-24 21:01:01.165208'),(27,'sessions','0001_initial','2024-12-24 21:01:01.183907');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mecanicien_mecanicien`
--

DROP TABLE IF EXISTS `mecanicien_mecanicien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mecanicien_mecanicien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tel` varchar(50) NOT NULL,
  `adresse` varchar(254) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `mecanicien_mecanicien_user_id_3a6a4984_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mecanicien_mecanicien`
--

LOCK TABLES `mecanicien_mecanicien` WRITE;
/*!40000 ALTER TABLE `mecanicien_mecanicien` DISABLE KEYS */;
/*!40000 ALTER TABLE `mecanicien_mecanicien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rendezvous_rendezvous`
--

DROP TABLE IF EXISTS `rendezvous_rendezvous`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rendezvous_rendezvous` (
  `id` int NOT NULL AUTO_INCREMENT,
  `besoins` longtext NOT NULL,
  `etat` tinyint(1) NOT NULL,
  `confirmer` tinyint(1) NOT NULL,
  `date` date NOT NULL,
  `heure` int NOT NULL,
  `duree` int DEFAULT NULL,
  `commentaire` longtext NOT NULL,
  `cout` double DEFAULT NULL,
  `idMecanicien_id` int NOT NULL,
  `idVehicule_id` int NOT NULL,
  `estPayer` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rendezvous_rendezvou_idMecanicien_id_2963e029_fk_mecanicie` (`idMecanicien_id`),
  KEY `rendezvous_rendezvou_idVehicule_id_fc195098_fk_vehicule_` (`idVehicule_id`),
  CONSTRAINT `rendezvous_rendezvou_idMecanicien_id_2963e029_fk_mecanicie` FOREIGN KEY (`idMecanicien_id`) REFERENCES `mecanicien_mecanicien` (`id`),
  CONSTRAINT `rendezvous_rendezvou_idVehicule_id_fc195098_fk_vehicule_` FOREIGN KEY (`idVehicule_id`) REFERENCES `vehicule_vehicule` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rendezvous_rendezvous`
--

LOCK TABLES `rendezvous_rendezvous` WRITE;
/*!40000 ALTER TABLE `rendezvous_rendezvous` DISABLE KEYS */;
/*!40000 ALTER TABLE `rendezvous_rendezvous` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicule_vehicule`
--

DROP TABLE IF EXISTS `vehicule_vehicule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicule_vehicule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `annee` int NOT NULL,
  `modele` varchar(50) NOT NULL,
  `fabricant` varchar(50) NOT NULL,
  `idClient_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicule_vehicule_idClient_id_b9fb6f81_fk_client_client_id` (`idClient_id`),
  CONSTRAINT `vehicule_vehicule_idClient_id_b9fb6f81_fk_client_client_id` FOREIGN KEY (`idClient_id`) REFERENCES `client_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicule_vehicule`
--

LOCK TABLES `vehicule_vehicule` WRITE;
/*!40000 ALTER TABLE `vehicule_vehicule` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicule_vehicule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-24 16:17:18
