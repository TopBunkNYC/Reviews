import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/Search.jsx';
import Stars from './components/Stars.jsx';
import ReviewList from './components/ReviewList.jsx';
// import style from './components/style.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Search />
        <Stars />
        <ReviewList />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));