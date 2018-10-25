import React from 'react';
import StarsModel from './StarsModel.jsx';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: 100,
      avgStars: 4.8
    }
  }

  render() {
    return (
      <div style={{ "display": "block", "width": "100%", "paddingTop": "10px", "paddingBottom": "10px" }}>
        <div className="totalReviewsDiv"><h2>{this.state.totalReviews} Reviews<StarsModel rating={this.state.avgStars} dimensions='25px' /></h2></div>
        <div className="searchBarDiv"><input className="searchBar" type="search" placeholder="Search reviews"></input></div>
      </div>
    )
  }
}