-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto1_db
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `asesores`
--

DROP TABLE IF EXISTS `asesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesores` (
  `id_asesor` int NOT NULL AUTO_INCREMENT,
  `as_nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `as_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `as_celular` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fk_especialidad` int NOT NULL,
  `ase_imagen` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_asesor`),
  KEY `fk_especialidad` (`fk_especialidad`),
  CONSTRAINT `asesores_ibfk_1` FOREIGN KEY (`fk_especialidad`) REFERENCES `especialidades` (`id_especialidad`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesores`
--

LOCK TABLES `asesores` WRITE;
/*!40000 ALTER TABLE `asesores` DISABLE KEYS */;
INSERT INTO `asesores` VALUES (1,'Juan Hernandez de la Cruz','Juandelacruz@gmail.com','304338087',4,'1'),(2,'Luciana Carolina Jaimes Serrano','lucajase@gmail.com','3143378977',3,'2'),(3,'Luis Felipe Calderon Calderon','Luiscalderonx2@gmail.com','3213539987',1,'3'),(4,'Andrea Forero Camargo','andrecam074@gmail.com','3043255621',4,'4');
/*!40000 ALTER TABLE `asesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citaasesor`
--

DROP TABLE IF EXISTS `citaasesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citaasesor` (
  `citaasesid` int NOT NULL AUTO_INCREMENT,
  `fk_horarioase` int NOT NULL,
  `fk_usuario` int NOT NULL,
  PRIMARY KEY (`citaasesid`),
  KEY `fk_horarioases` (`fk_horarioase`,`fk_usuario`),
  KEY `fk_usuario` (`fk_usuario`),
  CONSTRAINT `citaasesor_ibfk_1` FOREIGN KEY (`fk_horarioase`) REFERENCES `horariosase` (`id_horarioase`) ON UPDATE CASCADE,
  CONSTRAINT `citaasesor_ibfk_2` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`idusuarios`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citaasesor`
--

LOCK TABLES `citaasesor` WRITE;
/*!40000 ALTER TABLE `citaasesor` DISABLE KEYS */;
INSERT INTO `citaasesor` VALUES (3,1,3);
/*!40000 ALTER TABLE `citaasesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citatratamiento`
--

DROP TABLE IF EXISTS `citatratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citatratamiento` (
  `citatratid` int NOT NULL AUTO_INCREMENT,
  `fk_horariotrat` int NOT NULL,
  `fk_usuario` int NOT NULL,
  PRIMARY KEY (`citatratid`),
  KEY `fk_horariotrat` (`fk_horariotrat`),
  KEY `fk_usuario` (`fk_usuario`),
  CONSTRAINT `citatratamiento_ibfk_1` FOREIGN KEY (`fk_horariotrat`) REFERENCES `horariostrat` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `citatratamiento_ibfk_2` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`idusuarios`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citatratamiento`
--

LOCK TABLES `citatratamiento` WRITE;
/*!40000 ALTER TABLE `citatratamiento` DISABLE KEYS */;
INSERT INTO `citatratamiento` VALUES (6,1,3);
/*!40000 ALTER TABLE `citatratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidades`
--

DROP TABLE IF EXISTS `especialidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidades` (
  `id_especialidad` int NOT NULL AUTO_INCREMENT,
  `es_descripcion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (1,'nutricion'),(2,'fisioterapia\r\n'),(3,'cuidado facial y de la piel'),(4,'asesoria de imagen');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horariosase`
--

DROP TABLE IF EXISTS `horariosase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horariosase` (
  `id_horarioase` int NOT NULL AUTO_INCREMENT,
  `hor_ase_consultorio` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `hor_ase_fechayhora` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `hor_ase_Disponible` int NOT NULL,
  `fk_asesor` int NOT NULL,
  PRIMARY KEY (`id_horarioase`),
  KEY `fk_asesor` (`fk_asesor`),
  CONSTRAINT `horariosase_ibfk_1` FOREIGN KEY (`fk_asesor`) REFERENCES `asesores` (`id_asesor`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariosase`
--

LOCK TABLES `horariosase` WRITE;
/*!40000 ALTER TABLE `horariosase` DISABLE KEYS */;
INSERT INTO `horariosase` VALUES (1,'101','Martes 5pm',0,1),(2,'102','Miercoles 10am',1,2),(3,'101','Jueves 2pm',1,1);
/*!40000 ALTER TABLE `horariosase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horariostrat`
--

DROP TABLE IF EXISTS `horariostrat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horariostrat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_tratamiento` int NOT NULL,
  `fechayhora` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Disponible` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tratamiento` (`fk_tratamiento`),
  CONSTRAINT `horariostrat_ibfk_1` FOREIGN KEY (`fk_tratamiento`) REFERENCES `tratamientos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariostrat`
--

LOCK TABLES `horariostrat` WRITE;
/*!40000 ALTER TABLE `horariostrat` DISABLE KEYS */;
INSERT INTO `horariostrat` VALUES (1,1,'Lunes 10am',0),(2,1,'Martes 5pm',1),(3,2,'Lunes 4pm',1),(4,2,'Miercoles 8am',1),(5,3,'Martes 9am',1),(6,3,'sabado 2pm',1),(7,4,'Martes 1pm',1),(8,3,'sabado 2pm',1);
/*!40000 ALTER TABLE `horariostrat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descuento` int NOT NULL,
  `precio` int NOT NULL,
  `imagen` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Limpiador líquido para piel grasa',30,71000,'1','Para pieles mixtas a grasas, pieles sensibles Gel de baja espuma especialmente formulado que limpia profundamente y minimiza la apariencia de los poros sin quitarle a la piel su humedad natural.\r\n- Diseñado con una mezcla respaldada por dermatólogos de niacinamida (vitamina B3) y pantenol (provitamina B5) para preservar la barrera natural de la piel\r\n- Probado clínicamente para limpiar en profundidad mientras elimina eficazmente la suciedad, el exceso de grasa y el maquillaje sin dejar la piel seca o tirante\r\n- Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible','237 mL'),(2,'Barra Dermolimpiadora ',4,44900,'2','Para piel seca a normal y sensible\r\n\r\n \r\n\r\nLa barra limpieza profunda está clínicamente probada para eliminar la suciedad, el aceite y otras impurezas sin resecar la piel para una limpieza profunda.\r\n\r\n \r\n\r\n• Hace abundante espuma y se enjuaga limpiamente para dejar la piel con una sensación de limpieza e hidratación\r\n\r\n• Elimina la suciedad mientras mantiene una piel saludable\r\n\r\n• Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible','127 G'),(3,'Barra Limpieza Profunda',5,20000,'3','Para piel seca a normal y sensible\r\n\r\n \r\n\r\nLa barra limpieza profunda está clínicamente probada para eliminar la suciedad, el aceite y otras impurezas sin resecar la piel para una limpieza profunda.\r\n\r\n \r\n\r\n- Hace abundante espuma y se enjuaga limpiamente para dejar la piel con una sensación de limpieza e hidratación\r\n\r\n- Elimina la suciedad mientras mantiene una piel saludable\r\n\r\n- Probado por dermatólogos y clínicamente probado para ser suave con la piel sensibl','127G'),(4,'Toallitas Faciales',5,38050,'4','Para piel sensible\r\nPerfectos para la casa, los viajes o después de hacer ejercicio.\r\n\r\n- La fórmula suave no despojará a la piel de sus aceites protectores y emolientes naturales\r\n- Ultrasuave y suave para usar en la cara y el cuerpo\r\n- El cierre de plástico flexible asegura que los paños permanezcan húmedos, haciéndolos convenientes para viajar, ir al gimnasio o en el auto\r\n- Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible','20'),(5,'Optimal Hydration Water Gel Restaurado',20,134700,'5','Cara | Piel sensible, normal a mixta.\r\n\r\nComplejo HydroSensitive™, aumenta la concentración de agua en la piel en un 50 % proporcionando una mayor retención e hidratación*\r\nHidratación prolongada durante 72 horas.\r\nDesarrollado para todo tipo de pieles, incluidas las mixtas y grasas\r\nEl 100% de los usuarios informaron que el producto se sintió inmediatamente suave como la seda*\r\nEn solo 1 semana, la piel sensible parece más saludable, más tersa y uniforme, revelando su brillo natural**','58 G'),(6,'Optimal Hydration Sérum refrescante para contorno de ojos',0,134700,'6','Para pieles secas o deshidratadas y sensibles\r\n\r\nCrema para ojos dirigida que reduce la apariencia de las ojeras y la piel hinchada para una apariencia renovada. Formulada con ácido hialurónico, esta crema repone profundamente la hidratación de la piel durante 48 horas y ayuda a mejorar la calidad general de la piel sensible.\r\n\r\n• Con nuestro exclusivo Complejo HydroSensitiv™ con margarita azul relajante para profundizar la hidratación dinámica\r\n• Ayuda a mejorar la calidad de la piel sensible\r\n• Reduce la apariencia de las ojeras, la hinchazón y las líneas finas mientras deja el área debajo de los ojos con una sensación profundamente hidratada y fresca\r\n• Nutre y repone la hidratación de la piel durante 48 horas\r\n• Cuenta con una punta aplicadora de silicona suave para un masaje suave durante la aplicación\r\n• Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible\"','15 mL'),(7,'PRO AC control Espuma de limpieza ',0,103900,'7','Para pieles grasas, con tendencia acneica, pieles sensibles\r\n\r\nFórmula de limpieza profunda, dispensada a través de una bomba de espuma instantánea, elimina suavemente el exceso de grasa sin resecar la piel.\r\n\r\n• La tecnología de zinc ayuda a reducir las manchas, las imperfecciones y los brillos\r\n• Con una bomba de espuma instantánea, se ha comprobado clínicamente que este limpiador elimina el exceso de grasa sin resecar la piel\r\n• Fórmula con pH equilibrado para una piel de aspecto saludable\r\n• Probado dermatológicamente y clínicamente probado para ser suave con la piel sensible','236 mL'),(8,'PRO UREA 20% Crema Hidratante Restauradora',0,96000,'8','Para pieles secas y sensibles\r\n\r\nEl limpiador cremoso con una mezcla de 9 humectantes y vitamina E proporciona un alivio calmante para la piel muy seca.\r\n\r\n• Tecnología de Filagrina™ patena\r\n\r\n \r\n\r\nPara piel sensible Crema de rápida absorción diseñada para proteger la barrera natural de la piel y retener la humedad para una piel más suave y tersa.\r\n\r\n• Contiene Active-Hydration-Complex con urea y ácido láctico\r\n\r\n• Proporciona hidratación continua las 24 horas\r\n\r\n• Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible\r\n\r\ntada ayuda a restaurar la barrera de humedad de la piel y deja la piel hidratada y saludable\r\n• El lavado sin jabón humecta y calma mientras limpia\r\n• Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible','295 mL'),(9,'PRO AD control Limpiador corporal restaurador de la pie',10,9,'9','116206','295 mL'),(10,'Limpiador líquido para manos',0,96000,'10','Para piel sensible\r\n\r\nProbado bajo control dermatológico y apto incluso para las manos trabajadoras más sensibles\r\n\r\n• Contiene tensoactivos suaves que limpian delicadamente la piel\r\n\r\n• Esta fórmula no irritante contiene ingredientes hidratantes que brindan una experiencia de lavado nutritiva para dejar la piel suave y calmada incluso después de lavados repetidos.','237'),(11,'Loción Humectante',50,94000,'11','Para pieles secas a normales y sensibles\r\n\r\nLa loción ligera está clínicamente probada para calmar al instante y proporcionar una hidratación duradera de 48 horas.\r\n\r\n \r\n\r\n• Especialmente formulado con una mezcla respaldada por dermatólogos de niacinamida (vitamina B3), pantenol (provitamina B5) y glicerina hidratante para ayudar a mejorar la resiliencia de la piel sensible\r\n• Restaura completamente la barrera de humedad natural de la piel en 1 semana\r\n• 94% de los usuarios notaron que la piel se sentía completamente hidratada después de 1 uso\r\n• Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible','473ml'),(12,'Hidratante Fcial Diario FPS 5',20,112900,'12','Para pieles secas a normales y sensibles\r\n\r\nEstá clínicamente probado que hidrata la piel con FPS 50, ayudando a defenderla de los dañinos rayos solares.\r\n\r\n \r\n\r\n• Formulado con dióxido de titanio micronizado, que se absorbe rápidamente y no deja ningún residuo blanco.\r\n\r\n• Nutre para retener la humedad vital de la piel durante todo el día\r\n\r\n• Testado por dermatólogos y clínicamente probado para ser suave con la piel sensible','50 ML'),(13,'Loción Facial Hidratante de día con ácido hialurónico',30,94500,'13','Para piel mixta, sensible\r\n\r\nProporciona hidratación instantánea a la piel y bloquea la humedad para proteger la piel de la resequedad.\r\n\r\n \r\n\r\n• Formulada con ácido hialurónico, esta loción sin aceite retiene la humedad durante 24 horas para una piel hidratada y equilibrada\r\n• Loción ultraligera y sin aceite que se absorbe rápidamente para mantener la piel hidratada durante todo el día\r\n• Probado por dermatólogos y clínicamente probado para ser suave con la piel sensible\"','88ml');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudasesor`
--

DROP TABLE IF EXISTS `solicitudasesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudasesor` (
  `id_solicitud` int NOT NULL AUTO_INCREMENT,
  `so_tipodoc` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `so_numerodoc` int NOT NULL,
  `so_nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `so_departamento` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `so_ciudad` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `so_celular` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `so_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_solicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudasesor`
--

LOCK TABLES `solicitudasesor` WRITE;
/*!40000 ALTER TABLE `solicitudasesor` DISABLE KEYS */;
INSERT INTO `solicitudasesor` VALUES (1,'Cédula de Ciudadania',1006958104,'Jesus Enrique Bonilla España','Santander','Bucaramanga','3043360987','jesusenriquebonillaespana1@gmail.com'),(3,'Cédula de Ciudadania',1006923214,'Juan Pa','Antioquia','Barranquilla','32324324','JuanPa@gmail.com');
/*!40000 ALTER TABLE `solicitudasesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `idtipo_usuario` int NOT NULL AUTO_INCREMENT,
  `tu_descripcion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idtipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'cliente'),(2,'asesor'),(3,'administrador');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamientos`
--

DROP TABLE IF EXISTS `tratamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tratamientos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Descripcion` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamientos`
--

LOCK TABLES `tratamientos` WRITE;
/*!40000 ALTER TABLE `tratamientos` DISABLE KEYS */;
INSERT INTO `tratamientos` VALUES (1,'Limpieza Facial','Una limpieza profunda puede ayudar a eliminar el exceso de grasa y las impurezas de la piel.'),(2,'Mascarillas Faciales','Existen diversas mascarillas que pueden ayudar a hidratar, exfoliar y limpiar la piel.'),(3,'Exfoliación','El exfoliante facial es un tratamiento muy importante para eliminar las células muertas de la piel y estimular su regeneración.'),(4,'Masaje Facial','Un masaje facial ayuda a relajar la musculatura de la cara, aporta luminosidad y reduce la tensión acumulada en la piel.\r\n\r\n'),(7,'Tratamientos de hidratación','la piel adolescente puede sufrir de deshidratación, por lo que un tratamiento de hidratación profunda es una buena opción.'),(11,'Tratamientos de hidratación','hola esto es una prueba :) y se acaba de modificar');
/*!40000 ALTER TABLE `tratamientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuarios` int NOT NULL AUTO_INCREMENT,
  `us_nombre` varchar(255) DEFAULT NULL,
  `us_correo` varchar(255) DEFAULT NULL,
  `us_password` varchar(255) DEFAULT NULL,
  `us_direccion` varchar(255) DEFAULT NULL,
  `us_telefono` int DEFAULT NULL,
  `us_documento` int DEFAULT NULL,
  `us_activo` tinyint DEFAULT NULL,
  `tipo_usuario_idtipo_usuario` int NOT NULL,
  PRIMARY KEY (`idusuarios`),
  KEY `tipo_usuario_idtipo_usuario` (`tipo_usuario_idtipo_usuario`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_usuario_idtipo_usuario`) REFERENCES `tipo_usuario` (`idtipo_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'jesus bonillla','jesusenriquebonillaespana1@gmail.com','$2a$10$m3V8JTHElM5jCxxaIODA7eCbvL94YzkweD2uuhSZD1qVi.OaCuQ3W','calle 58 #30-67',2147483647,1006958104,NULL,1),(3,'michael hernandez','michael@gmail.com','$2a$10$m3V8JTHElM5jCxxaIODA7eCbvL94YzkweD2uuhSZD1qVi.OaCuQ3W','bucaricas',2147483647,1204358104,NULL,1),(7,'juank','juank@gmail.com','$2a$10$m3V8JTHElM5jCxxaIODA7eCbvL94YzkweD2uuhSZD1qVi.OaCuQ3W','calle 58 #30-67',2147483647,1006958104,NULL,3),(8,'juan guzman','juanguz@gmail.com','$2a$10$m3V8JTHElM5jCxxaIODA7eCbvL94YzkweD2uuhSZD1qVi.OaCuQ3W','calle 58 #30-67',2147483647,1043958102,NULL,2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-04 21:18:54
