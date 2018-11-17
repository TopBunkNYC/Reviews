const models = require('./model.js');

module.exports = {
  getAllReviews: (req, res) => {
    models.getAllReviews(req.query.id)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err) => {
      console.error(err);
    })
  },

  getRatings: (req, res) => {
    models.getRatings(req.query.id)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err) => {
      console.error(err);
    })
  },

  getSearch: (req, res) => {
    models.getSearch(req.query.id, req.query.query)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err) => {
      console.error(err);
    })
  },

  postReview: (req, res) => {
    models.postReview(req.body)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err) => {
      console.error(err);
    })
  },

  editReview: (req, res) => {
    models.editReview(req.query.r_id, req.query.newReviewText)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err) => {
      console.error(err);
    })
  },

  deleteReview: (req, res) => {
    models.deleteReview(req.query.r_id)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err) => {
      console.error(err);
    })
  }
};
