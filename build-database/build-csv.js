const faker = require('faker');
const moment = require('moment');
const fs = require('fs');


const randomDate = (startDate = new Date(2015, 08, 01), endDate = new Date()) => {
let rand = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
return rand.toISOString().slice(0,10);
}

const writeToStream = (writer, constructor, len) => {
  let startTime = moment();
  let i = len;

  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      const newBufferTime = moment();
      let data = constructor(200).join('\n') + '\n';
      ok = writer.write(data);
      const endBufferTime = moment();
      console.log(`${i}: Total time: ${(endBufferTime - startTime) / 1000}, Batch time: ${(endBufferTime - newBufferTime) / 1000}`)
      i--;
    }
    if (i > 0) {
      writer.once('drain', write);
    }
    if (i === 0) {
      writer.end();
    }
  };
  write();
}

( async() => {
////////// REVIEWS //////////
const reviewsStream = fs.createWriteStream('./build-database/data-reviews.csv');

let bookingIdHash = {};

const createReviews = (num) => {
  let arrayOfReviews = [];
  
  for (i = 0; i < num; i++) {
    let bookingId = Math.ceil(Math.random() * 400000000);
    if (!bookingIdHash.hasOwnProperty(bookingId)) {
      bookingIdHash[bookingId] = true;
    } else {
      while (bookingIdHash.hasOwnProperty(bookingId)) {
        bookingId++;
      }
      bookingIdHash[bookingId] = true;
    }

    arrayOfReviews.push(`${bookingId}\t${randomDate()}` + 
      `\t${faker.lorem.sentences(Math.ceil(Math.random() * 12))}\t${Math.ceil(Math.random() * 5)}` + 
      `\t${Math.ceil(Math.random() * 5)}\t${Math.ceil(Math.random() * 5)}` +
      `\t${Math.ceil(Math.random() * 5)}\t${Math.ceil(Math.random() * 5)}` + 
      `\t${Math.ceil(Math.random() * 5)}`);
  }

  return arrayOfReviews;
}

const startReviews = moment();

let writeAllReviews = () => {
  return new Promise((resolve) => {
    writeToStream(reviewsStream, createReviews, 20000);
    reviewsStream.on('finish', () => {
      resolve();
    })
  })
}
await writeAllReviews();

const endReviews = moment();

////////// BOOKINGS //////////
const bookingsStream = fs.createWriteStream('./build-database/data-bookings.csv');

const startBookings = moment();
let bookingIds = await Object.keys(bookingIdHash);
let bookingIdTracker = 0;
let endObjectKeys = moment();

const createBookings = (num) => {
  let bookingsArr = [];
  let stay_start = randomDate();
  let duration = Math.ceil(Math.random() * 7);
  let stay_end = moment(stay_start).add(duration, 'days').toISOString().slice(0, 10);

  for (i = 0; i < num; i++) {
    bookingsArr.push(`${bookingIds[bookingIdTracker]}\t${Math.ceil(Math.random() * 1000000)}` +
      `\t${Math.ceil(Math.random() * 1000000)}\t${stay_start}\t${stay_end}`);
    bookingIdTracker++;
  }
  return bookingsArr;
}

let writeAllBookings = () => {
  return new Promise((resolve) => {
    writeToStream(bookingsStream, createBookings, 20000);
    bookingsStream.on('finish', () => {
      resolve();
    })
  })
}
await writeAllBookings();

const endBookings = moment();

////////// LISTINGS //////////
const listingsStream = fs.createWriteStream('./build-database/data-listings.csv');
const startListings = moment();
let listingIdTracker = 1;

const createListings = (num) => {
  let listingsArr = [];

  for (i = 0; i < num; i++) {
    listingsArr.push(`${listingIdTracker}`);
    listingIdTracker++;
  }
  return listingsArr;
}

let writeAllListings = () => {
  return new Promise((resolve) => {
    writeToStream(listingsStream, createListings, 2000);
    listingsStream.on('finish', () => {
      resolve();
    })
  })
}
await writeAllListings();

const endListings = moment();

////////// USERS //////////
const usersStream = fs.createWriteStream('./build-database/data-users.csv');
const startUsers = moment();
let userIdTracker = 1;

const createUsers = (num) => {
  let usersArr = [];
  for (i = 0; i < num; i++) {
    usersArr.push(`${userIdTracker}\t${faker.internet.userName()}\t${faker.name.firstName()}` + 
      `\t${faker.image.imageUrl(48, 48)}\t${faker.internet.url()}`
    )
  }
  return usersArr;
}


let writeAllUsers = () => {
  return new Promise((resolve) => {
    writeToStream(usersStream, createUsers, 2000);
    usersStream.on('finish', () => {
      resolve();
    })
  })
}
await writeAllUsers();

const endUsers = moment();

console.log('duration for Reviews creation & writing:', endReviews.diff(startReviews), 'ms');
console.log('duration for Bookings, Object.keys on bookingIds hashtable:', endObjectKeys.diff(startBookings), 'ms');
console.log('duration for Bookings, after object.keys:', endBookings.diff(endObjectKeys), 'ms');
console.log('duration for Bookings TOTAL:', endBookings.diff(startBookings), 'ms');
console.log('duration for Listings:', endListings.diff(startListings), 'ms');
console.log('duration for Users:', endUsers.diff(startUsers), 'ms');
console.log('TOTAL duration for all four files:', endUsers.diff(startReviews), 'ms');
})();
