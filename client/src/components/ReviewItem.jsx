import React from 'react';

export default class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      truncate: false,
      shortText: this.props.review.review.substring(0, 280) + ' ... show more',
      reviewText: this.props.review.review
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.review.review.length > 280) {
      this.setState({
        truncate: true
      });
    }
  }

  clickHandler() {
    if (this.state.truncate === true) {
      this.setState({
        truncate: false
      });
    } else {
      this.setState({
        truncate: true
      });
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
            {this.props.review.review_date.substring(0, 10)}
          </span>
          <span style={{ "float": "right", "width": "10%" }}>
            <a href="/report"><img src="/images/flagReview.png" style={{"width": "15px", "height": "15px", "borderRadius": "50%"}}/></a>
          </span>
        </div>
        {/* <div style={{ "width": "100%" }}>{this.props.review.review}</div> */}
        <div style={{ "width": "100%" }} onClick={this.clickHandler}>{this.state.truncate ? this.state.shortText : this.state.reviewText}</div>
      </div>
    )
  }
}