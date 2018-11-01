DROP DATABASE IF EXISTS staybnb;
CREATE DATABASE staybnb;
USE staybnb;

CREATE TABLE Listings (
  `l_id` INTEGER NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`l_id`)
);

CREATE TABLE Users (
  `u_id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50),
  `display_name` VARCHAR(50),
  `photo_url` VARCHAR(200),
  `profile_url` VARCHAR(200),
  PRIMARY KEY (`u_id`)
);

CREATE TABLE Bookings (
  `b_id` INTEGER NOT NULL AUTO_INCREMENT,
  `listings_id` INTEGER NOT NULL,
  `users_id` INTEGER NOT NULL,
  `stay_start` DATE,
  `stay_end` DATE,
  PRIMARY KEY (`b_id`),
  FOREIGN KEY (`listings_id`) REFERENCES Listings(`l_id`),
  FOREIGN KEY (`users_id`) REFERENCES Users(`u_id`)
);

CREATE TABLE Reviews (
  `r_id` INTEGER NOT NULL AUTO_INCREMENT,
  `bookings_id` INTEGER NOT NULL,
  `review_date` DATE,
  `review` VARCHAR(5000),
  `accuracy` TINYINT,
  `communication` TINYINT,
  `cleanliness` TINYINT,
  `location` TINYINT,
  `check-in` TINYINT,
  `value` TINYINT,
  PRIMARY KEY (`r_id`),
  FOREIGN KEY (`bookings_id`) REFERENCES Bookings(`b_id`)
);