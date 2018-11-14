
COPY topbunk.bookings
FROM '/Users/dweinzimmer/Documents/Coding/HackReactor_Course/Reviews/build-database/data-bookings.csv' 
WITH (HEADER false, DELIMITER E'\t')

