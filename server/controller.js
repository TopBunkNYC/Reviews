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

  postReview: (req, res) => {   // IMPLEMENT!
    models.postReview(req.query.parameters, thing, thing, (response) => {
      res.send(response);
    });
  },

  editReview: (req, res) => {   // IMPLEMENT!
    models.editReview(req.query.parameters, thing, thing, (response) => {
      res.send(response);
    });
  },

  deleteReview: (req, res) => {
    models.deleteReview(req.query.id, (response) => {
      res.send(response);
    });
  }
};
