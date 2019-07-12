// const db = require('../database-mysql/index.js');
const knex = require('../database-pg/index.js');

module.exports = {
  getAllReviews: (listingId) => {
    if (listingId > 1000000) {
      listingId = (listingId % 1000000) + 1;
    }
    return knex.raw(`SELECT *
    FROM bookings
    INNER JOIN reviews
    ON (bookings.b_id = reviews.booking_id AND bookings.listing_id = ?)
    INNER JOIN users 
    ON (bookings.user_id = users.u_id)
    ORDER BY reviews.review_date DESC;
    `,(listingId)); 
  },

  getReview: (reviewId) => {
    return knex.raw(`SELECT * FROM reviews WHERE r_id = ?`, [reviewId]);
  },

  getRatings: (listingId) => {
    if (listingId > 1000000) {
      listingId = (listingId % 1000000) + 1;
    }
    return knex.raw(`SELECT 
      AVG(accuracy) AS accuracy, 
      AVG(communication) AS communication, 
      AVG(cleanliness) AS cleanliness, 
      AVG(location) AS location, 
      AVG(checkin) AS checkin, 
      AVG(value) AS value
      FROM reviews
      INNER JOIN bookings
      ON (reviews.booking_id = bookings.b_id AND bookings.listing_id = ?);
    `, (listingId));
  },

  getSearch: (listingId, queryString) => {
    if (listingId > 1000000) {
      listingId = (listingId % 1000000) + 1;
    }
    return knex.raw(`SELECT *
      FROM reviews
      INNER JOIN Bookings
      ON 
        (reviews.booking_id = bookings.b_id 
        AND bookings.listing_id = ? 
        AND reviews.review_text LIKE ?)
      INNER JOIN Users
      ON (bookings.user_id = users.u_id)
      ORDER BY Reviews.review_date DESC;
    `, [listingId, `${queryString}`]);
  },

  postReview: (options) => { // update
    let orderedOptions = [
      options.bookingId || Math.floor(Math.random() * 15000000),
      new Date().toISOString().slice(0,10),
      options.reviewText, 
      options.accuracy || null,
      options.communication || null, 
      options.cleanliness || null, 
      options.location || null, 
      options.checkin || null, 
      options.value || null
    ];
    return knex.raw(`
      INSERT into reviews 
        (booking_id, review_date, review_text, accuracy, 
        communication, cleanliness, location, checkin, value)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, (orderedOptions));
  },

  editReview: (reviewId, newReviewText) => {
    return knex.raw(`
      UPDATE reviews SET review_text = ?
      WHERE r_id = ?;
    `, [newReviewText, reviewId]);
  },

  deleteReview: (booking_id) => {
    return knex.raw(`DELETE FROM reviews 
      WHERE booking_id = ?
    `, [booking_id]);
  }
};
