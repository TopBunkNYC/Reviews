const db = require('./index.js');
const mongoose = require('mongoose');
const faker = require('faker');
const moment = require('moment');

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

var Listing = mongoose.model('listing', listingSchema);
var Review = mongoose.model('Review', reviewSchema);


////// Generate data //////
const randomDate = (startDate = new Date(2015, 08, 01), endDate = new Date()) => {
  let rand = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return rand.toISOString().slice(0,10);
}

let startWrite;
let endWrite;

(async () => {
  let startAll = moment();

  ////////// LISTINGS with nested REVIEWS //////////
  startWrite = moment();
  let listingIdTracker = 1;
  let reviewCounter = 1;
  for (let i = 0; i < 8; i++) {
    
    let listingsArr = [];

    for (let j = 0; j < 1250; j++, listingIdTracker++) {   // number betw 1 to 1,000,000
      
      let listingInstance = new Listing({
        _id: listingIdTracker,
        reviews: []
      })

      let numReviews = Math.floor(Math.random() * 10);
      for (let k = 0; k < numReviews; k++) {
        let reviewInstance = new Review({
          _id: reviewCounter,
          review_date: randomDate(),
          review_text: faker.lorem.paragraphs(Math.ceil(Math.random() * 2)),
          accuracy: Math.ceil(Math.random() * 5),
          communication: Math.ceil(Math.random() * 5),
          cleanliness: Math.ceil(Math.random() * 5),
          location: Math.ceil(Math.random() * 5),
          checkin: Math.ceil(Math.random() * 5),
          value: Math.ceil(Math.random() * 5)
        });
        listingInstance.reviews.push(reviewInstance);
        reviewCounter++;
      }

      listingsArr.push(listingInstance);
    }
    try {
      await Listing.insertMany(listingsArr);
    } catch (error) {
      console.error(error);
    }
  }

  endWrite = moment();
  console.log('duration for Listings creation & writing:', endWrite.diff(startWrite), 'ms');
  console.log('the number of reviews created is', reviewCounter - 1)
  
  Listing.findOne({
    _id: 9
  })
  .exec(function (err, listing) {
    if (err) return console.error(err);
    console.log('listing looks like', listing);
  });
  
    ////////// Reviews //////////
    // startWrite = moment();
    // let reviewCounter = 1;
    // // 80 is for 100k, 800 is for 1 million, 8000 for 10 million
    // for (let i = 0; i < 8; i++) {   // number between 1 to 10,000,000
    //   let reviewsArr = [];
  
    //   for (j = 0; j < 1250; j++) {
    
    //     let reviewInstance = new Review({
    //       r_id: reviewCounter++,
    //       review_date: randomDate(),
    //       review_text: faker.lorem.paragraphs(Math.ceil(Math.random() * 2)),
    //       accuracy: Math.ceil(Math.random() * 5),
    //       communication: Math.ceil(Math.random() * 5),
    //       cleanliness: Math.ceil(Math.random() * 5),
    //       location: Math.ceil(Math.random() * 5),
    //       checkin: Math.ceil(Math.random() * 5),
    //       value: Math.ceil(Math.random() * 5)
    //     })
  
    //     reviewsArr.push(reviewInstance);
    //   }
    //   await Review.insertMany(reviewsArr);
    // }
    // endWrite = moment();
    // console.log('duration for Reviews creation & writing:', endWrite.diff(startWrite), 'ms');
    
    
    
  
  // ////////// BOOKINGS //////////
  // let startObjectKeys = moment();
  // let bookingIds = Object.keys(bookingIdHash);
  // let bookingIdTracker = 0;
  // let endObjectKeys = moment();
  // console.log('duration for Object.keys on hashtable:', endObjectKeys.diff(startObjectKeys), 'ms');
  
  // startWrite = moment();
  // for (let i = 0; i < 8000; i++) {
  //   let bookingsArr = [];

  //   for (let j = 0; j < 1250; j++) {
  //     let stay_start = randomDate();
  //     let duration = Math.ceil(Math.random() * 7);
  //     let stay_end = moment(stay_start).add(duration, 'days').toISOString().slice(0, 10);
  //     bookingsArr.push({
  //       b_id: bookingIds[bookingIdTracker++],
  //       listing_id: Math.ceil(Math.random() * 1000000),
  //       user_id: Math.ceil(Math.random() * 1000000),
  //       stay_start: stay_start,
  //       stay_end: stay_end
  //     })
  //   }
  //   await pgMethods.insertBookingsPG();
  // }
  // endWrite = moment();
  // console.log('duration for Bookings creation & writing (after Object.keys):', endWrite.diff(startWrite), 'ms');

  
  // ////////// USERS //////////
  // startWrite = moment();
  // let userIdTracker = 1;
  // for (let i = 0; i < 800; i++) {
  //   let usersArr = [];

  //   for (let j = 0; j < 1250; j++, userIdTracker++) {   // number betw 1 to 1,000,000
  //     usersArr.push({
  //       u_id: userIdTracker,
  //       username: faker.internet.userName(),
  //       display_name: faker.name.firstName(),
  //       photo_url: faker.image.imageUrl(48, 48),
  //       profile_url: faker.internet.url()
  //     })
  //   }
  //   await pgMethods.insertUsersPG();
  // }
  // endWrite = moment();
  // console.log('duration for Users creation & writing:', endWrite.diff(startWrite), 'ms');

  // let endAll = moment();
  // console.log('duration for entire build:', endAll.diff(startAll), 'ms');
  // // pgMethods.endPGconnection(); // this is shutting off prematurely
})()


