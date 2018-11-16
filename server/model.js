// const db = require('../database-mysql/index.js');
const knex = require('../database-pg/index.js')

module.exports = {
  getAllReviews: (listingId, callback) => {
    knex.raw(`SELECT *
    FROM bookings
    INNER JOIN reviews
    ON (bookings.b_id = reviews.booking_id AND bookings.listing_id = ?)
    INNER JOIN users 
    ON (bookings.user_id = users.u_id)
    ORDER BY reviews.review_date DESC;
    `,(listingId))
    .then((response) => {
      callback(response.rows);
    })
    .catch((err) => {
      console.error(err);
    });
  },

  getRatings: (listingId, callback) => {  // update
    knex.raw(`SELECT 
      AVG(accuracy) AS accuracy, 
      AVG(communication) AS communication, 
      AVG(cleanliness) AS cleanliness, 
      AVG(location) AS location, 
      AVG(checkin) AS checkin, 
      AVG(value) AS value
      FROM Reviews
      INNER JOIN Bookings
      ON Reviews.booking_id = Bookings.b_id
      LEFT JOIN Users
      ON Bookings.user_id = Users.u_id
      WHERE Bookings.listing_id = ?
    `, (listingId))
    .then((response) => {
      callback(response.rows);
    })
    .catch((err) => {
      console.error(err);
    });
  },

  getSearch: (listingId, query, callback) => {  // update
    knex.raw(`SELECT *
      FROM Reviews
      INNER JOIN Bookings
      ON Reviews.booking_id = Bookings.b_id
      LEFT JOIN Users
      ON Bookings.user_id = Users.u_id
      WHERE Bookings.listing_id = ?
      AND Reviews.review_text LIKE ?
      ORDER BY Reviews.review_date DESC;
    `, (listingId, `"${query}"`))
    .then((response) => {
      callback(response.rows);
    })
    .catch((err) => {
      console.error(err);
    });
  },

  postReview: (options, callback) => { // update
    var orderedOptions = [
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
    knex.raw(`
      INSERT into Reviews 
        (booking_id, review_date, review_text, accuracy, 
        communication, cleanliness, location, checkin, value)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, (orderedOptions))
    .then((response) => {
      callback(response.rows);
    })
    .catch((err) => {
      console.error(err);
    });
  },

  editReview: (reviewId, newReviewText, callback) => { // update
    knex.raw(`
      UPDATE Reviews SET review_text = ?
      WHERE r_id = ?;
    `, [newReviewText, reviewId])
    .then((response) => {
      callback(response.rows);
    })
    .catch((err) => {
      console.error(err);
    });
  },

  deleteReview: (reviewId, callback) => { // update
    knex.raw(`DELETE FROM Reviews 
      WHERE r_id = ?
    `, [reviewId])
    .then((response) => {
      callback(response.rows);
    })
    .catch((err) => {
      console.error(err);
    });
  }
};
