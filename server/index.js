require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 8001;

// const db = require('../database-mysql/index.js');
const db = require('../database-pg/index.js');
const router = require('./router.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const source = path.join(__dirname, '/../client/dist');
app.use(express.static(source));
app.use('/', router);


app.listen(port, () => { console.log(`Listening on port ${port}`); });

module.exports.app = app;
