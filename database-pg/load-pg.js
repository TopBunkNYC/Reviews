
const knex = require('./index.js');

exports.insertReviewsPG = (reviewsArr) => {
  knex.batchInsert('topbunk.reviews', reviewsArr, 625);
}

exports.insertBookingsPG = (bookingsArr) => {
  knex.batchInsert('topbunk.bookings', bookingsArr, 625);
}

exports.insertListingsPG = (listingsArr) => {
  knex.batchInsert('topbunk.listings', listingsArr, 625);
}

exports.insertUsersPG = (usersArr) => {
  knex.batchInsert('topbunk.users', usersArr, 625);
}

exports.endPGconnection = () => {
  knex.destroy();
}
