import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx';
import Stars from './components/Stars.jsx';
import ReviewList from './components/ReviewList.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      search: []
    }
    this.getAllReviews = this.getAllReviews.bind(this);
    this.searchReviews = this.searchReviews.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();
  }

  getAllReviews() {
    axios.get('/reviews')
    .then((result) => {
      this.setState({
        reviews: result.data
      });
    })
    .catch((error) => {
      console.error(error);
    })
  }

  searchReviews(query) {
    // console.log('searchReviews query is: ' + query)
    axios.get('/search', { params: { query: query } })
      .then((result) => {
        console.log('searchReviews result is: ' + result);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    return (
      <div>
        <Search searchReviews={this.searchReviews}/>
        <Stars />
        <ReviewList />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));