# Reviews
This is the "Reviews" module in our TopBunk web application. To visit the deployed service, go **[here](http://18.218.35.42/listings?id=92921)**. 

The images below provide a tour of the deployed proxy server, which brings together the description, booking, reviews, and about-the-neighborhood services into a unified application. You can find the proxy server's Github page **[here](https://github.com/TopBunkNYC/Proxy_David)**.

<img src="https://github.com/TopBunkNYC/Reviews/blob/master/demo_gif_1.gif" width="65%" height="65%">

<img src="https://github.com/TopBunkNYC/Reviews/blob/master/demo_gif_2.gif" width="65%" height="65%">

## Related Projects

  - https://github.com/TopBunkNYC/Description
  - https://github.com/TopBunkNYC/Booking
  - https://github.com/TopBunkNYC/Neighborhood 

## Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running the application
To run the application in non-development mode from within the root directory: 
```sh
# Create CSV files of the four database files. 
# NB: these files take up about 4GB and take 10 minutes to generate on a MacBook Pro with 8GB RAM.
npm run build-csv
npm run load-csv

# Compile bundle.js using Webpack
npm run build

# Start server on localhost
npm start
```

Then access the application at (http://localhost:8001).

The `load-csv` script will run the PostgreSQL schema and create the tables, and then load data into the tables created. You will need to set up a `config.js` file at the root of your folder with the following structure:
```js
exports.dbConfig = {
  host     : 'localhost',
  user     : 'your_postgres_user_name',
  password : 'your_postgres_password__may_be_empty',
  database : 'topbunk'
}
```

To run in developer mode:
```sh
npm run build-csv
npm run load-csv
# Compile bundle.js using Webpack's -w[atch] flag
npm run react-dev
# Start server on localhost with nodemon
npm run start-dev

# To run tests:
npm test
```
