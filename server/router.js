const express = require('express');
const path = require('path');
const controller = require('./controller.js');

const router = express.Router();

router.get('/reviews', controller.getAllReviews);
router.get('/review', controller.getReview);
router.get('/ratings', controller.getRatings);
router.get('/search', controller.getSearch);

router.post('/reviews', controller.postReview);
router.put('/reviews', controller.editReview);
router.delete('/reviews', controller.deleteReview);

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

module.exports = router;
