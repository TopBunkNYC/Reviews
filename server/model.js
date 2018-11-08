const db = require('../database/index.js');

module.exports = {
  getAllReviews: (listingId, callback) => {
    db.query(`SELECT *
      FROM Reviews
      INNER JOIN Bookings
      ON Reviews.booking_id = Bookings.b_id
      LEFT JOIN Users
      ON Bookings.user_id = Users.u_id
      WHERE Bookings.listing_id = ?
      ORDER BY Reviews.review_date DESC;
    `,(listingId), (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  getRatings: (listingId, callback) => {
    db.query(`SELECT 
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
    `, (listingId), (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  getSearch: (listingId, query, callback) => {
    db.query(`SELECT *
      FROM Reviews
      INNER JOIN Bookings
      ON Reviews.booking_id = Bookings.b_id
      LEFT JOIN Users
      ON Bookings.user_id = Users.u_id
      WHERE Bookings.listing_id = ?
      AND Reviews.review_text LIKE ?
      ORDER BY Reviews.review_date DESC;
    `, (listingId, `"${query}"`), (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  postReview: (params) => {},

  editReview: (reviewId, newReviewText, callback) => {
    db.query(`
      UPDATE Reviews SET review_text = ?
      WHERE r_id = ?;
    `, (newReviewText, reviewId), (err, response) => {
      if (err) {
        console.error(err);
      } else {
        callback(response);
      }
    })
  },

  deleteReview: (reviewId, callback) => {
    db.query(`DELETE FROM Reviews 
      WHERE r_id = ?
    `, (reviewId), (err, response) => {
      if (err) {
        console.error(err);
      } else {
        callback(response);
      }
    });
  }
};
