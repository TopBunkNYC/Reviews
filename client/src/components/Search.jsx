import React from 'react';
import StarsModel from './StarsModel.jsx';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    let averageRatings = 0;
    let starsLoaded = false;
    if (props.ratings.length > 0) {
      let sum = 0;
      let obj = props.ratings[0];
      for (var key in obj) {
        sum += (obj[key] * 1)
      }
      averageRatings = sum / 6;
      starsLoaded = true;
    }
    let totalRatings = 0;
    let ratingsLoaded = false;
    if (props.reviews.length > 0) {
      totalRatings = props.reviews.length;
      ratingsLoaded = true;
    }

    this.state = {
      query: '',
      starsLoaded: starsLoaded || false,
      avgRating:  averageRatings || 0,
      ratingsLoaded: ratingsLoaded || false,
      totalRatings: totalRatings || 0
    }
    this.searchQuery = this.searchQuery.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.starsLoaded = this.starsLoaded.bind(this);
    this.reviewsLoaded = this.reviewsLoaded.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.ratings !== prevProps.ratings) {
      this.starsLoaded(this.props.ratings);
    }
    if (this.props.reviews !== prevProps.reviews) {
      this.reviewsLoaded(this.props.reviews);
    }
  }

  starsLoaded(ratings) {
    let sum = 0;
    for (var key in ratings[0]) {
      sum += ratings[0][key]
    }
    let avg = sum / 6;
    this.setState({
      starsLoaded: true,
      avgRating: avg
    });
  }

  reviewsLoaded(reviews) {
    this.setState({
      ratingsLoaded: true,
      totalRatings: reviews.length
    });
  }

  searchQuery(event) {
    this.setState({
      query: event.target.value
    })
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.props.searchReviews(this.state.query)
    }
  }

  render() {
    return (
      <div className="searchContainer">
        <div className="totalReviewsDiv">
          <h2 id="sectionTitle">{this.state.totalRatings} Reviews <StarsModel id="listingOverallStars" rating={this.state.avgRating} dimensions='25px'/></h2>
        </div>
        <div className="searchBarDiv">
          <img src="https://s3.us-east-2.amazonaws.com/topbunk-profilephotos/search.png" className="magnifyImg"/>
          <input
            className="searchBar"
            type="search"
            placeholder="Search reviews"
            onChange={this.searchQuery}
            value={this.state.query}
            onKeyPress={this.handleKeyPress}
          ></input>
        </div>
      </div>
    )
  }
}