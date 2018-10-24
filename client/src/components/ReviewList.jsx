import React from 'react';
import ReviewItem from './ReviewItem.jsx';

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <ReviewItem />
      </div>
    )
  }
}
