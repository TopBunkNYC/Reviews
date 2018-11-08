const db = require('../database/index.js');

module.exports = {
  getAllReviews: (listingID, callback) => {
    let sqlQuery = `SELECT *
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.booking_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.user_id = Users.u_id
    WHERE Bookings.listing_id = ${listingID}
    ORDER BY Reviews.review_date DESC;`;
    db.query(sqlQuery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  getRatings: (listingID, callback) => {
    let sqlQuery = `
    SELECT AVG(accuracy) AS accuracy, 
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
    WHERE Bookings.listing_id = ${listingID};`;
    db.query(sqlQuery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  getSearch: (listingID, query, callback) => {
    let sqlQuery = `SELECT *
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.booking_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.user_id = Users.u_id
    WHERE Bookings.listing_id = ${listingID}
    AND Reviews.review LIKE "${query}"
    ORDER BY Reviews.review_date DESC;`;

    db.query(sqlQuery, (error, response) => {
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
