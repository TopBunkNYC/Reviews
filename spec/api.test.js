const axios = require('axios');

describe('API functionality', () => {
  test('creates a review', async () => {
    // create a review
    // retrieve a review and save in variable
    // delete the review that was added
    // expect(retrievedReview).toBeDefined()
  })

  test('reads/retrieves a review', async () => {
    // retrieve a review and save in variable
    // expect(retrievedReview). to have the text I expect (look at DB)
  })

  test('updates a review', async () => {
    // create a review
    // update the review text
    // retrieve the review and save in variable
    // delete the review that was added
    // expect(retrievedReview). text to be what I updated it to be
  })

  test('deletes a review', async () => {
    // create a review
    axios.post('http://localhost:8001/reviews', {
      "bookingId": 939,
      "reviewDate": "2018-09-20",
      "reviewText": "This is just a test! I did not stay here.",
      "accuracy": 5,
      "communication": 4,
      "cleanliness": 5,
      "location": 4,
      "checkin": 5, 
      "value": 4
    })
    .catch((err) => {
      console.error(err);
    })
    // retrieve a review and save in recordBefore
    // delete the review that was added
    // attempt to retrieve same review and save in recordAfter
    // expect(recordBefore).toBeDefined()
    // expect(recordAfter). to not exist
  })
})

/* 
options.bookingId || Math.floor(Math.random() * 15000000),
options.reviewDate || Date(Date.now()),
options.reviewText, 
options.accuracy || null,
options.communication || null, 
options.cleanliness || null, 
options.location || null, 
options.checkin || null, 
options.value || null
*/