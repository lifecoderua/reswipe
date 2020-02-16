import React from 'react';

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
  }

  render() {
    return(
      <div>
        <h1>Select communities</h1>
        <input type="checkbox"/>aaa
        <input type="checkbox"/>aab
        <input type="checkbox"/>aac
      </div>
    )
  }
}

export default Preferences;
