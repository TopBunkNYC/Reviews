const db = require('../database/index.js');

module.exports = {
  getAllReviews: (listingID, callback) => {
    db.query(`SELECT *
      FROM Reviews
      INNER JOIN Bookings
      ON Reviews.booking_id = Bookings.b_id
      LEFT JOIN Users
      ON Bookings.user_id = Users.u_id
      WHERE Bookings.listing_id = ?
      ORDER BY Reviews.review_date DESC;
    `,(listingID), (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  getRatings: (listingID, callback) => {
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

  getSearch: (listingID, query, callback) => {
    db.query(`SELECT *
      FROM Reviews
      INNER JOIN Bookings
      ON Reviews.booking_id = Bookings.b_id
      LEFT JOIN Users
      ON Bookings.user_id = Users.u_id
      WHERE Bookings.listing_id = ?
      AND Reviews.review LIKE ?
      ORDER BY Reviews.review_date DESC;
    `, (listingID, `"${query}"`), (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  postReview: () => {},

  editReview: () => {},

  deleteReview: () => {}
};
