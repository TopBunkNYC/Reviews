import React from 'react';
import StarsModel from './StarsModel.jsx';

export default class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accuracy: 5,
      communication: 4,
      cleanliness: 3,
      location: 2,
      checkIn: 1,
      value: 3.5
    }
  }

  render() {
    return (
      <div style={{ "display": "block", "width": "100%", "paddingTop": "10px", "paddingBottom": "10px" }}>
        <div className="floatLeft50">
          <div>
            <span className="floatLeft50">Accuracy</span>
            <span className="floatRight50"><StarsModel rating={this.state.accuracy} dimensions='15px' /></span>
          </div>
          <div>
            <span className="floatLeft50">Communication</span>
            <span className="floatRight50"><StarsModel rating={this.state.communication} dimensions='15px' /></span>
          </div>
          <div>
            <span className="floatLeft50">Cleanliness</span>
            <span className="floatRight50"><StarsModel rating={this.state.cleanliness} dimensions='15px' /></span>
          </div>
        </div>

        <div className="floatRight50">
          <div>
            <span className="floatLeft50">Location</span>
            <span className="floatRight50"><StarsModel rating={this.state.location} dimensions='15px' /></span>
          </div>
          <div>
            <span className="floatLeft50">Check-in</span>
            <span className="floatRight50"><StarsModel rating={this.state.checkIn} dimensions='15px' /></span>
          </div>
          <div>
            <span className="floatLeft50">Value</span>
            <span className="floatRight50"><StarsModel rating={this.state.value} dimensions='15px' /></span>
          </div>
        </div>
      </div>
    )
  }
}
