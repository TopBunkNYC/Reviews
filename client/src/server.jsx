import React from 'react';
import Reviews from './index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews,
      search: [],
      ratings: this.props.ratings,
      showSearch: false
    }
  }

  render() {
    return (
      <div>
        <Reviews initialState={this.state}/>
      </div>
    )
  }
};

export default App;
