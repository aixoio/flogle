-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2022 at 02:12 AM
-- Server version: 8.0.20
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flogle`
--

DELIMITER $$
--
-- Procedures
--
CREATE PROCEDURE `addAcoin` (IN `userIDAdd` BIGINT, IN `acoinAdds` DOUBLE)  NO SQL
BEGIN

SET @yournewacoin = (SELECT (acoins + acoinAdds) FROM acoin_data WHERE user_id = userIDAdd);

UPDATE acoin_data SET acoins = @yournewacoin WHERE user_id = userIDAdd;

END$$

CREATE PROCEDURE `getAcoinDataByUsername` (IN `un` TEXT)  NO SQL
BEGIN
SET @uid = (SELECT id FROM users WHERE username = un);
SELECT * FROM acoin_data WHERE user_id = @uid;
END$$

CREATE PROCEDURE `removeAcoin` (IN `userIDAdd` BIGINT, IN `acoinAdds` DOUBLE)  NO SQL
BEGIN

SET @yournewacoin = (SELECT (acoins - acoinAdds) FROM acoin_data WHERE user_id = userIDAdd);

UPDATE acoin_data SET acoins = @yournewacoin WHERE user_id = userIDAdd;

END$$

CREATE PROCEDURE `removeChatWithMessages` (IN `cid` BIGINT(19))  BEGIN
DELETE FROM chats WHERE id = cid;
DELETE FROM messages WHERE chat_id = cid;
END$$

CREATE PROCEDURE `requestAcoin` (IN `toUserID` BIGINT, IN `fromUserID` BIGINT, IN `acoinsIN` DOUBLE)  NO SQL
BEGIN

SET @tousersnewacoins = (SELECT (acoins - acoinsIN) FROM acoin_data WHERE user_id = toUserID);
SET @fromusersnewacoins = (SELECT (acoins + acoinsIN) FROM acoin_data WHERE user_id = fromUserID);

UPDATE acoin_data SET acoins = @tousersnewacoins WHERE user_id = toUserID;
UPDATE acoin_data SET acoins = @fromusersnewacoins WHERE user_id = fromUserID;

END$$

CREATE PROCEDURE `sendAcoin` (IN `toUserID` BIGINT, IN `fromUserID` BIGINT, IN `acoinsIN` DOUBLE)  NO SQL
BEGIN

SET @tousersnewacoins = (SELECT (acoins + acoinsIN) FROM acoin_data WHERE user_id = toUserID);
SET @fromusersnewacoins = (SELECT (acoins - acoinsIN) FROM acoin_data WHERE user_id = fromUserID);

UPDATE acoin_data SET acoins = @tousersnewacoins WHERE user_id = toUserID;
UPDATE acoin_data SET acoins = @fromusersnewacoins WHERE user_id = fromUserID;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `acoin_data`
--

CREATE TABLE `acoin_data` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `acoins` double NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `acoin_globals`
--

CREATE TABLE `acoin_globals` (
  `id` bigint NOT NULL,
  `canMine` tinyint(1) NOT NULL,
  `current_app_version` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `acoin_globals`
--

INSERT INTO `acoin_globals` (`id`, `canMine`, `current_app_version`) VALUES
(1, 1, '2.0');

-- --------------------------------------------------------

--
-- Stand-in structure for view `allacoinusers`
-- (See below for the actual view)
--
CREATE TABLE `allacoinusers` (
`acoins` double
,`username` text
);

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` bigint NOT NULL,
  `uuid` text NOT NULL,
  `title` text NOT NULL,
  `from_id` bigint NOT NULL,
  `to_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `docs`
--

CREATE TABLE `docs` (
  `id` bigint NOT NULL,
  `uuid` text NOT NULL,
  `title` text NOT NULL,
  `user_id` bigint NOT NULL,
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint NOT NULL,
  `chat_id` bigint NOT NULL,
  `from_id` bigint NOT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chat_uuid` text NOT NULL,
  `time` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `top15acoinusers`
-- (See below for the actual view)
--
CREATE TABLE `top15acoinusers` (
`acoins` double
,`username` text
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` text NOT NULL,
  `password_hash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure for view `allacoinusers`
--
DROP TABLE IF EXISTS `allacoinusers`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `allacoinusers`  AS SELECT `users`.`username` AS `username`, `acoin_data`.`acoins` AS `acoins` FROM (`users` join `acoin_data` on((`users`.`id` = `acoin_data`.`user_id`))) ORDER BY `acoin_data`.`acoins` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `top15acoinusers`
--
DROP TABLE IF EXISTS `top15acoinusers`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `top15acoinusers`  AS SELECT `users`.`username` AS `username`, `acoin_data`.`acoins` AS `acoins` FROM (`users` join `acoin_data` on((`users`.`id` = `acoin_data`.`user_id`))) ORDER BY `acoin_data`.`acoins` DESC LIMIT 0, 15 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acoin_data`
--
ALTER TABLE `acoin_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `acoin_globals`
--
ALTER TABLE `acoin_globals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `docs`
--
ALTER TABLE `docs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acoin_data`
--
ALTER TABLE `acoin_data`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `acoin_globals`
--
ALTER TABLE `acoin_globals`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `docs`
--
ALTER TABLE `docs`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
