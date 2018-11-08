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

  // test('deletes a review', async () => {
  //   // create a review
  //   let before;
  //   let after;
  //   return axios.post('http://localhost:8001/reviews', {
  //     "bookingId": 79000000,
  //     "reviewText": "This is just a test! I did not stay here. I came from a test.",
  //     "accuracy": 5,
  //     "communication": 4,
  //     "cleanliness": 5,
  //     "location": 4,
  //     "checkin": 5, 
  //     "value": 4
  //   })
  //   .then(
  //     axios.get('http://localhost:8001/reviews', {params: {bookingId: 79000000}})
  //     .then((result) => {
  //       before = result;
  //     })
  //     .then(
  //       axios.delete('http://localhost:8001/reviews', {data: {bookingId: 79000000}})
  //     )
  //     .then(
  //       axios.get('http://localhost:8001/reviews', {params: {bookingId: 79000000}})
  //     )
  //     .then((result) => {
  //       after = result;
  //     })
  //   )
  //   .catch((err) => {
  //     console.error(err);
  //   })
  //   .then(() => {
  //     expect(before).toBeDefined();
  //     expect(after).toBeUndefined();
  //   })
  //   // retrieve a review and save in recordBefore
  //   // delete the review that was added
  //   // attempt to retrieve same review and save in recordAfter
  //   // expect(recordBefore).toBeDefined()
  //   // expect(recordAfter). to not exist
  // })
})
