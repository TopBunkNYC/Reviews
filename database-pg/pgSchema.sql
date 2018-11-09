DROP TABLE IF EXISTS topbunk.reviews, topbunk.listings, topbunk.bookings, topbunk.users;
DROP SCHEMA IF EXISTS topbunk;

CREATE SCHEMA topbunk;

CREATE TABLE topbunk.reviews (
  r_id SERIAL PRIMARY KEY,
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

CREATE TABLE topbunk.listings (
  l_id SERIAL PRIMARY KEY
);

CREATE TABLE topbunk.bookings (
  b_id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  stay_start DATE,
  stay_end DATE
);

CREATE TABLE topbunk.users (
  u_id SERIAL PRIMARY KEY,
  username TEXT,
  display_name TEXT,
  photo_url TEXT,
  profile_url TEXT
);
