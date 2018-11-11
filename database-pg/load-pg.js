
const knex = require('./index.js');

exports.insertReviewsPG = () => {
  knex.batchInsert('topbunk.reviews', reviewsArr, 625);
}

exports.insertBookingsPG = () => {
  knex.batchInsert('topbunk.bookings', bookingsArr, 625);
}

exports.insertListingsPG = () => {
  knex.batchInsert('topbunk.listings', listingsArr, 625);
}

exports.insertUsersPG = () => {
  knex.batchInsert('topbunk.users', usersArr, 625);
}

exports.endPGconnection = () => {
  knex.destroy();
}
