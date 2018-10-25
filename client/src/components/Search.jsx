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
      <div>
        <span>
          <h2>
            {this.state.totalReviews} Reviews <StarsModel rating={this.state.avgStars} dimensions='25px' />
            <input type="text" placeholder="Search reviews" style={{ "float": "right", "alignItems": "center" }}></input>
          </h2>
        </span>
      </div>
    )
  }
}