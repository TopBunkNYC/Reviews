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
      <div>
        <span style={{ "float": "left", "width": "50%"}}>
          <span>
            <span style={{ "float": "left", "width": "50%" }}>Accuracy</span>
            <span style={{ "float": "right", "width": "50%" }}><StarsModel rating={this.state.accuracy} dimensions='15px' /></span>
          </span>
          <span>
            <span style={{ "float": "left", "width": "50%" }}>Communication</span>
            <span style={{ "float": "right", "width": "50%" }}><StarsModel rating={this.state.communication} dimensions='15px' /></span>
          </span>
          <span>
            <span style={{ "float": "left", "width": "50%" }}>Cleanliness</span>
            <span style={{ "float": "right", "width": "50%" }}><StarsModel rating={this.state.cleanliness} dimensions='15px' /></span>
          </span>
        </span>

        <span style={{"float": "right", "width": "50%"}}>
          <span>
            <span style={{ "float": "left", "width": "50%" }}>Location</span>
            <span style={{ "float": "right", "width": "50%" }}><StarsModel rating={this.state.location} dimensions='15px' /></span>
          </span>
          <span>
            <span style={{ "float": "left", "width": "50%" }}>Check-in</span>
            <span style={{ "float": "right", "width": "50%" }}><StarsModel rating={this.state.checkIn} dimensions='15px' /></span>
          </span>
          <span>
            <span style={{ "float": "left", "width": "50%" }}>Value</span>
            <span style={{ "float": "right", "width": "50%" }}><StarsModel rating={this.state.value} dimensions='15px' /></span>
          </span>
        </span>
      </div>
    )
  }
}
