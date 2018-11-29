import React from 'react';
import Reviews from './index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews,
      ratings: this.props.ratings,
      search: [],
      showSearch: false
    }
  }

  render() {
    return (
      <div>
        <Reviews 
          reviews={this.state.reviews} 
          ratings={this.state.ratings} 
          search={this.state.search} 
          showSearch={this.state.showSearch}
        />
      </div>
    )
  }
};

export default App;
