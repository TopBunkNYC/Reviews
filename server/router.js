const express = require('express');
const controller = require('./controller.js');

const router = express.Router();

router.get('/reviews', controller.getAll);
router.get('/search', controller.search);

module.exports = router;
