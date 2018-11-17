const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// const db = require('../database-mysql/index.js');
const db = require('../database-pg/index.js');
const router = require('./router.js');

const app = express();
const source = path.join(__dirname, '/../client/dist');

app.use(bodyParser.json());

app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(source));

app.use('/', router);

app.listen(8001, () => { console.log('Listening on port 8001'); });

module.exports.app = app;
