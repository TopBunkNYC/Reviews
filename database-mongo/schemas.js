const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
    index: true
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
}, {autoIndex: false})

var listingSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
    index: true
  },
  reviews: [reviewSchema]
}, {autoIndex: false})

exports.ListingModel = mongoose.model('listing', listingSchema);
exports.ReviewModel = mongoose.model('review', reviewSchema);
