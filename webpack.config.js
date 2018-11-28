const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

 const client = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR, 
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};

// module.exports = client; // delete

const server = {
  entry: `${SRC_DIR}/server.jsx`,
  target: 'node',
  output: {
    filename: 'review-bundle-server.js',
    path: DIST_DIR,
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};

module.exports = [client, server];
