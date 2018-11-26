const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/topbunkReviews';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})

module.exports = db;
