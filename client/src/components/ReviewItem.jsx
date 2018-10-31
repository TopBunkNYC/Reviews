import React from 'react';

export default class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div style={{"borderBottom": "1px solid #EBEBEB", "paddingTop": "10px", "paddingBottom": "10px"}}>
        <div style={{"width": "100%", "paddingBottom": "20px"}}>
          <span style={{ "float": "left", "width": "10%" }}>
            <img src={this.props.review.photo_url} style={{"width": "50px", "height": "50px"}}/>
          </span>
          <span style={{ "float": "center", "width": "60%" }}>
            {this.props.review.display_name} <br />
            {this.props.review.review_date}
          </span>
          <span style={{ "float": "right", "width": "10%" }}>
            <a href="/report"><img src="/images/flagReview.png" style={{"width": "15px", "height": "15px"}}/></a>
          </span>
        </div>
        <div style={{"width": "100%" }}>{this.props.review.review}</div>
      </div>
    )
  }
}