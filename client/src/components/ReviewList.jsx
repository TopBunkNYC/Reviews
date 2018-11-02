import React from 'react';
import ReviewItem from './ReviewItem.jsx';

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
  const review = this.props.reviews.map((review) => {
    return <ReviewItem key={review.b_id} review={review}/>
  });
  
    return (
      <div style={{"paddingTop": "10px", "paddingBottom": "10px"}}>
        {review}
      </div>
    )
  }
}
