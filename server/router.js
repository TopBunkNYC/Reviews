const express = require('express');
const path = require('path');
const controller = require('./controller.js');
const model = require('./model.js');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const application = require('../client/dist/review-bundle-server.js').default;

const router = express.Router();

router.get('/reviews', controller.getAllReviews);
router.get('/review', controller.getReview);
router.get('/ratings', controller.getRatings);
router.get('/search', controller.getSearch);

router.post('/reviews', controller.postReview);
router.put('/reviews', controller.editReview);
router.delete('/reviews', controller.deleteReview);

const ssr = (id) => {
  let props;
  let html;
  // let resultSSR;

  return Promise.all([
    // 0: reviews
    model.getAllReviews(Number(id))
    .then((response) => {
      // console.log('I AM RETURNING REVIEWS IN ROUTER: ', response.rows[0]);
      return response.rows;
    }),

    // 1: ratings
    model.getRatings(Number(id))
    .then((response) => {
      // console.log('I AM RETURNING RATINGS IN ROUTER: ', response.rows);
      return response.rows;
    })
  ])
  .then((data) => {
    props = {
      reviews: data[0], 
      ratings: data[1], 
      search: [], 
      showSearch: false
    }
    // console.log('PROPS ARE: ', props);
    // console.log('A MOMENT LATER, PROPS ARE: ', props);
    props.reviews.forEach((review) => {
      review.review_date = review.review_date.toISOString();
      // console.log('!!!!!!!TYPE OF DATE IS ', typeof review.review_date, JSON.stringify(review.review_date))
    })
    // console.log('AND ONE MORE MOMENT LATER, PROPS ARE: ', props);
    let component = React.createElement(application, props);
    // console.log('COMPONENT ISSSSSSS: ', JSON.stringify(component));
    html = ReactDOMServer.renderToString(component);
    // console.log('HTML LOOOKS LIKEEEE', html);
    // console.log('SSR FUNCTION IS RETURNING: ', [html, JSON.stringify(props)]);
    // resultSSR = [html, JSON.stringify(props)];
    return [html, JSON.stringify(props)];
  })
  .catch((err) => { 
    console.error(err); 
  })

  // console.log('resultssr looks like', resultSSR);
  // return resultSSR;
};

router.get('/listings', async (req, res) => {
  // console.log('req.query.id is', req.query.id);
  ssr(req.query.id)
  .then((results) => {
    // console.log('RESULTS[1] IN GET ARE:', results[1]);
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reviews</title>
          <link rel="icon" type="image/png" href="https://s3.us-east-2.amazonaws.com/topbunk-profilephotos/favicon.ico">
          <link rel="stylesheet" type="text/css" href="/style.css">
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        </head>
        <body>
          <div id="reviews">${results[0]}</div>
          <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
          <script type="text/javascript" src="/bundle.js"></script>
          <script>
            ReactDOM.hydrate(
              React.createElement(Reviews, ${
                { initialState: results[1] }
              }),
              document.getElementById('reviews')
            );
          </script>
        </body>
      </html>
    `);
  })
  .catch((err) => { console.error(err); })
})


router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

module.exports = router;
