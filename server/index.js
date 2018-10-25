const express = require('express');
const config = require('../config.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

let port = config.port;
app.listen(port, () => {console.log(`Listening on port ${port}`)})