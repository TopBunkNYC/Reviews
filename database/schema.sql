DROP DATABASE IF EXISTS topbunk;
CREATE DATABASE topbunk;
USE topbunk;

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
  `listing_id` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  `stay_start` DATE,
  `stay_end` DATE,
  PRIMARY KEY (`b_id`),
  FOREIGN KEY (`listing_id`) REFERENCES Listings(`l_id`),
  FOREIGN KEY (`user_id`) REFERENCES Users(`u_id`)
);

CREATE TABLE Reviews (
  `r_id` INTEGER NOT NULL AUTO_INCREMENT,
  `booking_id` INTEGER NOT NULL,
  `review_date` DATE,
  `review` VARCHAR(5000),
  `accuracy` TINYINT,
  `communication` TINYINT,
  `cleanliness` TINYINT,
  `location` TINYINT,
  `check-in` TINYINT,
  `value` TINYINT,
  PRIMARY KEY (`r_id`),
  FOREIGN KEY (`booking_id`) REFERENCES Bookings(`b_id`)
);