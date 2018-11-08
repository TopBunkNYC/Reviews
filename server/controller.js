const models = require('./model.js');

module.exports = {
  getAllReviews: (req, res) => {
    models.getAllReviews(req.query.id, (response) => {
      res.send(response);
    });
  },

  getRatings: (req, res) => {
    models.getRatings(req.query.id, (response) => {
      res.send(response);
    });
  },

  getSearch: (req, res) => {
    models.search(req.query.id, req.query.query, (response) => {
      res.send(response);
    });
  },

  postReview: (req, res) => {},

  editReview: (req, res) => {},

  deleteReview: (req, res) => {}
};
