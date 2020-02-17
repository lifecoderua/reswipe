import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

  handleChange(community) {
    return((event) => {
      this.props.onCommunitiesChange({ ...this.props.communities, [community]: event.target.checked });
    }).bind(this);
  }

  render() {
    const checkboxes = Object.keys(this.props.communities).map((community) => (
      <FormControlLabel
        style={{color: 'white'}}
        control={<Checkbox
          style={{color: 'white'}}
          checked={this.props.communities[community]}
          onChange={this.handleChange(community)}
           />}
        label={community}
      />
      ));

    return(
      <div>
        <h1>Select communities</h1>
        {checkboxes}
        <Checkbox
          checked={this.props.communities['Art']}
          onChange={this.handleChange('Art')}
          label={'Art'} />
        <input type="checkbox"/>aaa
        <input type="checkbox"/>aab
        <input type="checkbox"/>aac
      </div>
    )
  }
}

export default Preferences;
