const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const db = require('../database/index.js');
const router = require('./router.js');

const app = exprgess();
const source = path.join(__dirname, '/../client/dist');

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
 });

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(source));

app.use('/', router);

app.listen(7000, () => { console.log('Listening on port 7000'); });

module.exports.app = app;
