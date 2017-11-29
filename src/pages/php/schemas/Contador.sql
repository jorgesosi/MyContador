CREATE DATABASE  IF NOT EXISTS `Contador` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `Contador`;
-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: Contador
-- ------------------------------------------------------
-- Server version	5.7.19

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
-- Table structure for table `Bancos`
--

DROP TABLE IF EXISTS `Bancos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bancos` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Cuentas`
--

DROP TABLE IF EXISTS `Cuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cuentas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `numero` varchar(40) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `saldo` float NOT NULL,
  `idCuentasTipo` int(11) NOT NULL,
  `idUsusarios` int(11) NOT NULL,
  `idBancos` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCuentasTipo` (`idCuentasTipo`),
  KEY `idUsusarios` (`idUsusarios`),
  KEY `idBancos` (`idBancos`),
  CONSTRAINT `Cuentas_ibfk_1` FOREIGN KEY (`idCuentasTipo`) REFERENCES `CuentasTipo` (`id`),
  CONSTRAINT `Cuentas_ibfk_2` FOREIGN KEY (`idUsusarios`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `Cuentas_ibfk_3` FOREIGN KEY (`idBancos`) REFERENCES `Bancos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CuentasTipo`
--

DROP TABLE IF EXISTS `CuentasTipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CuentasTipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Hogares`
--

DROP TABLE IF EXISTS `Hogares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hogares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Movimientos`
--

DROP TABLE IF EXISTS `Movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Movimientos` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `importe` float NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `idMovimientosTipo` int(11) NOT NULL,
  `idCuentas` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idMovimientosTipo` (`idMovimientosTipo`),
  KEY `idCuentas` (`idCuentas`),
  CONSTRAINT `Movimientos_ibfk_1` FOREIGN KEY (`idMovimientosTipo`) REFERENCES `MovimientosTipo` (`id`),
  CONSTRAINT `Movimientos_ibfk_2` FOREIGN KEY (`idCuentas`) REFERENCES `Cuentas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MovimientosTipo`
--

DROP TABLE IF EXISTS `MovimientosTipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MovimientosTipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Permisos`
--

DROP TABLE IF EXISTS `Permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Permisos` (
  `id` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `contraseña` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UsuariosHogares`
--

DROP TABLE IF EXISTS `UsuariosHogares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsuariosHogares` (
  `id` int(11) NOT NULL,
  `idHogares` int(11) NOT NULL,
  `idUsuarios` int(11) NOT NULL,
  `idPermisos` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idHogares` (`idHogares`),
  KEY `idUsuarios` (`idUsuarios`),
  KEY `idPermisos` (`idPermisos`),
  CONSTRAINT `UsuariosHogares_ibfk_1` FOREIGN KEY (`idHogares`) REFERENCES `Hogares` (`id`),
  CONSTRAINT `UsuariosHogares_ibfk_2` FOREIGN KEY (`idUsuarios`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `UsuariosHogares_ibfk_3` FOREIGN KEY (`idPermisos`) REFERENCES `Permisos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-02  9:42:16
