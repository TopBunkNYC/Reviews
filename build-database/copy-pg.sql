
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

