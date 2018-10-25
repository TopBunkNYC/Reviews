const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('../config.js');
const router = require('./router.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.use('/', router);

app.listen(port, () => { console.log(`Listening on port ${port}`); });