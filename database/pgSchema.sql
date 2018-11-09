DROP TABLE IF EXISTS topbunk.Reviews, topbunk.Listings, topbunk.Bookings, topbunk.Users;
DROP SCHEMA IF EXISTS topbunk;

CREATE SCHEMA topbunk;

CREATE TABLE topbunk.Reviews (
  r_id SERIAL,
  booking_id INTEGER NOT NULL,
  review_date DATE,
  review_text TEXT,
  accuracy SMALLINT,
  communication SMALLINT,
  cleanliness SMALLINT,
  location SMALLINT,
  checkin SMALLINT,
  value SMALLINT
);

CREATE TABLE topbunk.Listings (
  l_id SERIAL
);

CREATE TABLE topbunk.Bookings (
  b_id SERIAL,
  listing_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  stay_start DATE,
  stay_end DATE
);

CREATE TABLE topbunk.Users (
  u_id SERIAL,
  username TEXT,
  display_name TEXT,
  photo_url TEXT,
  profile_url TEXT
);
