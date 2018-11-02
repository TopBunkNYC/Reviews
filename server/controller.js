const { getAllReviews, getRatings, search } = require('./model.js');

module.exports = {
  getAllReviews: (req, res) => {
    getAllReviews(req.query.id, (response) => {
      res.send(response);
    });
  },

  getRatings: (req, res) => {
    getRatings(req.query.id, (response) => {
      res.send(response);
    });
  },

  search: (req, res) => {
    let searchQuery = req.query.query;
    let queryString = '';
    for (let i = 0; i < searchQuery.length; i++) {
      if (i === 0) {
        queryString += `AND Reviews.review LIKE "%${searchQuery[0]}%"`;
      } else {
        queryString += ` OR "%${searchQuery[i]}%"`;
      }
    }

    search(req.query.id, queryString, (response) => {
      res.send(response);
    });
  },
};
