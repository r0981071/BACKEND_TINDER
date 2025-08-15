CREATE DATABASE IF NOT EXISTS tinder;
USE tinder;

CREATE TABLE `user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `profile` (
  `profile_id` INT UNSIGNED NOT NULL PRIMARY KEY,  -- no AUTO_INCREMENT
  `name` VARCHAR(255) NOT NULL,
  `gender_male` BOOLEAN NOT NULL,
  `age` INT NOT NULL,
  `nationallity` VARCHAR(255) NOT NULL,
  `height` DOUBLE NOT NULL,
  `weight` DOUBLE NOT NULL,
  `bio` VARCHAR(255) NOT NULL,
  `profile_pic_url` VARCHAR(255),
  FOREIGN KEY (`profile_id`) REFERENCES `user`(`user_id`)
);

CREATE TABLE `swipes` (
  `swipe_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `swiper_id` INT UNSIGNED NOT NULL,
  `swiped_id` INT UNSIGNED NOT NULL,
  `is_like` BOOLEAN NOT NULL,
  UNIQUE KEY `unique_swipe` (`swiper_id`, `swiped_id`),
  FOREIGN KEY (`swiped_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`swiper_id`) REFERENCES `user`(`user_id`)
);

CREATE TABLE `matches` (
  `match_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user1_id` INT UNSIGNED NOT NULL,
  `user2_id` INT UNSIGNED NOT NULL,
  UNIQUE KEY `unique_match` (`user1_id`, `user2_id`),
  FOREIGN KEY (`user2_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`user1_id`) REFERENCES `user`(`user_id`)
);

CREATE TABLE `conversations` (
  `conversation_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user1_id` INT UNSIGNED NOT NULL,
  `user2_id` INT UNSIGNED NOT NULL,
  UNIQUE KEY `unique_conversation` (`user1_id`, `user2_id`),
  FOREIGN KEY (`user1_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`user2_id`) REFERENCES `user`(`user_id`)
);

CREATE TABLE `messages` (
  `message_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `conversation_id` INT UNSIGNED NOT NULL,
  `sender_id` INT UNSIGNED NOT NULL,
  `receiver_id` INT UNSIGNED NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  FOREIGN KEY (`sender_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`receiver_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`conversation_id`)
);
