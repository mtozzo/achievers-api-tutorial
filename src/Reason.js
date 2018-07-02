import React, { Component } from 'react';
import { TextArea, Header } from 'semantic-ui-react'
import './Reason.css';

class Reason extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onReasonChange(e.target.value);
  }

  render() {
    return (
      <div className="reason">
        <Header as="h2" content="Personalize your message" />
        <TextArea rows={5} placeholder='Give a reason for this recognition' onChange={this.handleChange} />
      </div>
    );
  }
}
  
export default Reason;
