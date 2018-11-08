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
    models.getSearch(req.query.id, req.query.query, (response) => {
      res.send(response);
    });
  },

  postReview: (req, res) => {
    models.postReview(req.body, (response) => {
      res.send(response);
    });
  },

  editReview: (req, res) => {
    models.editReview(req.query.r_id, req.query.newReviewText, (response) => {
      res.send(response);
    });
  },

  deleteReview: (req, res) => {
    models.deleteReview(req.query.r_id, (response) => {
      res.send(response);
    });
  }
};
