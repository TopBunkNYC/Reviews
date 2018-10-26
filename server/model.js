const db = require('../database/index.js');

module.exports = {
  getAll: (callback) => {
    const SQLquery = 'SELECT * FROM reviews';
    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },

  search: (query, callback) => {
    const SQLquery = 'SELECT * FROM reviews WHERE SET ?';
    db.query(SQLquery, query, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },
};
