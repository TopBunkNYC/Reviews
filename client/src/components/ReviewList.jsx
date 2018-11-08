import React from 'react';
import ReviewItem from './ReviewItem.jsx';

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
  const reviews = this.props.reviews.map((review) => {
    return <ReviewItem key={review.b_id} review={review}/>
  });
  
    return (
      <div className="reviewListContainer">
        {reviews}
      </div>
    )
  }
}
