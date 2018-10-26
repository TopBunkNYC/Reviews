const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database/index.js');
const router = require('./router.js');

const app = express();
const source = path.join(__dirname, '/../client/dist');

app.use(bodyParser.json());
app.use(express.static(source));

app.use('/', router);

let port = 7000;
app.listen(port, () => { console.log(`Listening on port ${port}`); });

module.exports.app = app;