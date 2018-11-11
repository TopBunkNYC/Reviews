const db = require('./index-mongo.js');
const mongoose = require('mongoose');


var reviewSchema = new mongoose.Schema({
  r_id: {
    type: Number,
    unique: true
  },
  review_date: Date,
  review_text: String,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkin: Number,
  u_id: Number,
  username: String,
  display_name: String,
  photo_url: String,
  profile_url: String
})

var listingSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true
  },
  reviews: [reviewSchema]
})
