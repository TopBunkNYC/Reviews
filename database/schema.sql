DROP DATABASE IF EXISTS staybnb;
CREATE DATABASE staybnb;
USE staybnb;

CREATE TABLE Listings (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);

CREATE TABLE Users (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50),
  `display_name` VARCHAR(50),
  `photo_url` VARCHAR(200),
  `profile_url` VARCHAR(200),
  PRIMARY KEY (`id`)
);

CREATE TABLE Bookings (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `listings_id` INTEGER NOT NULL,
  `users_id` INTEGER NOT NULL,
  `stay_start` DATE,
  `stay_end` DATE,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listings_id`) REFERENCES Listings(`id`),
  FOREIGN KEY (`users_id`) REFERENCES Users(`id`)
);

CREATE TABLE Reviews (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `bookings_id` INTEGER NOT NULL,
  `review_date` DATE,
  `accuracy` TINYINT CHECK (`accuracy` < 6),
  `communication` TINYINT,
  `cleanliness` TINYINT,
  `location` TINYINT,
  `check-in` TINYINT,
  `value` TINYINT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`bookings_id`) REFERENCES Bookings(`id`)
);