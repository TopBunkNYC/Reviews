import React from 'react';
import StarsModel from './StarsModel.jsx';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      starsLoaded: false,
      avgRating: 0
    }
    this.searchQuery = this.searchQuery.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.starsLoaded = this.starsLoaded.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.ratings !== prevProps.ratings) {
      this.starsLoaded(this.props.ratings);
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
      <div style={{ "display": "block", "width": "100%", "paddingTop": "10px", "paddingBottom": "10px" }}>
        <div className="totalReviewsDiv">
          <h2>100 Reviews<StarsModel rating={this.state.starsLoaded ? this.state.avgRating : 0} dimensions='25px' /></h2>
        </div>
        <div className="searchBarDiv">
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