
COPY topbunk.bookings
FROM '/Users/dweinzimmer/Documents/Coding/HackReactor_Course/Reviews/build-database/data-bookings.csv' 
WITH (HEADER false, DELIMITER E'\t');

COPY topbunk.listings
FROM '/Users/dweinzimmer/Documents/Coding/HackReactor_Course/Reviews/build-database/data-listings.csv' 
WITH (HEADER false, DELIMITER E'\t');

COPY topbunk.reviews
FROM '/Users/dweinzimmer/Documents/Coding/HackReactor_Course/Reviews/build-database/data-reviews.csv' 
WITH (HEADER false, DELIMITER E'\t');

COPY topbunk.users
FROM '/Users/dweinzimmer/Documents/Coding/HackReactor_Course/Reviews/build-database/data-users.csv' 
WITH (HEADER false, DELIMITER E'\t');

ALTER DATABASE topbunk SET search_path = topbunk, public;

ALTER SEQUENCE reviews_r_id_seq 
RESTART WITH 10000001;

ALTER SEQUENCE listings_l_id_seq 
RESTART WITH 10000001;

ALTER SEQUENCE users_u_id_seq 
RESTART WITH 1000001;

CREATE INDEX listing_index 
ON bookings (listing_id);

CREATE INDEX booking_index
ON reviews (booking_id);

CREATE INDEX user_index
ON bookings (user_id);
