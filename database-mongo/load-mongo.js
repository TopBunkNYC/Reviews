const db = require('./index.js');
const mongoose = require('mongoose');
const faker = require('faker');
const moment = require('moment');

const Listing = require('./schemas.js').ListingModel;
const Review = require('./schemas.js').ReviewModel;

const randomDate = (startDate = new Date(2015, 08, 01), endDate = new Date()) => {
  let rand = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return rand.toISOString().slice(0,10);
}

let startWrite;
let endWrite;

(async () => {
  let startAll = moment();

  let listingIdTracker = 1;
  let reviewCounter = 1;

  for (let i = 0; i < 500; i++) {
    let listingsArr = [];

    startWrite = moment();
    
    for (let j = 0; j < 2000; j++, listingIdTracker++) {
      // Create a listing instance
      let listingInstance = new Listing({
        _id: listingIdTracker,
        reviews: []
      })

      // Add a random number of reviews between 0 and 10
      let numReviews = Math.floor(Math.random() * 21);
      for (let k = 0; k < numReviews; k++) {
        let reviewInstance = new Review({
          _id: reviewCounter++,
          review_date: randomDate(),
          review_text: faker.lorem.paragraphs(Math.ceil(Math.random() * 2)),
          accuracy: Math.ceil(Math.random() * 5),
          communication: Math.ceil(Math.random() * 5),
          cleanliness: Math.ceil(Math.random() * 5),
          location: Math.ceil(Math.random() * 5),
          checkin: Math.ceil(Math.random() * 5),
          value: Math.ceil(Math.random() * 5),
          u_id: Math.ceil(Math.random() * 1000000),
          username: faker.internet.userName(),
          display_name: faker.name.firstName(),
          photo_url: faker.image.imageUrl(48, 48),
          profile_url: faker.internet.url()
        });

        listingInstance.reviews.push(reviewInstance);
      }

      listingsArr.push(listingInstance);
    }

    // Insert the batch of 1,250 reviews
    try {
      await Listing.insertMany(listingsArr);
    } catch (error) {
      console.error(error);
    }

    endWrite = moment();
    console.log(`duration for batch ${i} Listings creation & writing:`, endWrite.diff(startWrite), 'ms');
  }

  endWrite = moment();
  console.log('duration for Listings creation & writing:', endWrite.diff(startAll), 'ms');
  console.log('the number of reviews created is', reviewCounter - 1)  
})()

exports.ListingModel = Listing;

