const db = require('../database/index.js');

module.exports = {
  getAllReviews: (listingID, callback) => {
    const SQLquery = `SELECT *
    FROM reviews
    INNER JOIN bookings
    ON reviews.bookings_id = bookings.b_id
    LEFT JOIN users
    ON bookings.users_id = users.u_id
    WHERE bookings.listings_id = ${listingID}
    ORDER BY reviews.review_date DESC;`;
    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  getRatings: (listingID, callback) => {
    let SQLquery = `SELECT AVG(accuracy) AS accuracy, AVG(communication) AS communication, AVG(cleanliness) as cleanliness, AVG(\`location\`) as location, AVG(\`check-in\`) as checkin, AVG(\`value\`) as value
    FROM reviews
    INNER JOIN bookings
    ON reviews.bookings_id = bookings.b_id
    LEFT JOIN users
    ON bookings.users_id = users.u_id
    WHERE bookings.listings_id = ${listingID};`;
    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  search: (listingID, query, callback) => {
    const SQLquery = `SELECT *
    FROM reviews
    INNER JOIN bookings
    ON reviews.bookings_id = bookings.b_id
    LEFT JOIN users
    ON bookings.users_id = users.u_id
    WHERE bookings.listings_id = ${listingID}
    AND reviews.review LIKE "${query}"
    ORDER BY reviews.review_date DESC;`;
    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },
};
