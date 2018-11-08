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
  }
  // ,

  // postReview: (req, res) => {
  //   models.
  // },

  // editReview: (req, res) => {
  //   models.editReview()
  // },

  // deleteReview: (req, res) => {}
};
