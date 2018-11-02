const db = require('../database/index.js');

module.exports = {
  getAllReviews: (listingID, callback) => {
    const SQLquery = `SELECT *
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.bookings_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.users_id = Users.u_id
    WHERE Bookings.listings_id = ${listingID}
    ORDER BY Reviews.review_date DESC;`;
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
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.bookings_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.users_id = Users.u_id
    WHERE Bookings.listings_id = ${listingID};`;
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
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.bookings_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.users_id = Users.u_id
    WHERE Bookings.listings_id = ${listingID}
    ${query}
    ORDER BY Reviews.review_date DESC;`;

    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },
};
