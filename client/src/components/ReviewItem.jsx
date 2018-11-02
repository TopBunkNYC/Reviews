import React from 'react';

export default class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      truncate: false,
      shortText: this.props.review.review.substring(0, 280) + '...',
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

  clickHandler(event) {
    event.preventDefault();
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
    const renderText = this.state.truncate === true ?
      (<div>{this.state.shortText} <a href='' onClick={this.clickHandler}>Read more</a> </div>)
      : (<div>{this.state.reviewText}</div>);
    return (
      <div className="reviewItemContainer">
        <div className="reviewItemHeader">
          <span className="reviewItemHeaderPhotoSpan">
            <img src={this.props.review.photo_url} className="reviewItemHeaderPhoto"/>
          </span>
          <span className="reviewItemHeaderInfo">
            {this.props.review.display_name} <br />
            {this.props.review.review_date.substring(0, 10)}
          </span>
          <span className="reviewItemHeaderFlag">
            <img src="http://imgur.com/8ELuIV8.png" className="reviewItemHeaderFlagImg"/>
          </span>
        </div>
        {renderText}
      </div>
    )
  }
}