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
      res.send(response.rows.map((ratingObject) => {
        ratingObject.accuracy *= 1;
        ratingObject.communication *= 1;
        ratingObject.cleanliness *= 1;
        ratingObject.location *= 1;
        ratingObject.checkin *= 1;
        ratingObject.value *= 1;
        return ratingObject;
      }))
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
