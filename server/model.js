var db = require('../database/index.js');

module.exports = {
  getAll: (callback) => {
    let SQLquery = `SELECT * FROM reviews`;
    db.query(SQLquery, (error, response) => {
      if (error) { console.log(error); }
      else { callback(response); }
    });
  },

  search: (query, callback) => {
    let SQLquery = `SELECT * FROM reviews WHERE SET ?`;
    db.query(SQLquery, query, (error, response) => {
      if (error) { console.log(error); }
      else { callback(response); }
    })
  }
}