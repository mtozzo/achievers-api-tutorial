import React, { Component } from 'react';
import { TextArea, Header } from 'semantic-ui-react'
import './Reason.css';

class Reason extends Component {
  render() {
    return (
      <div className="reason">
        <Header as="h2" content="Personalize your message" />
        <TextArea rows={5} placeholder='Give a reason for this recognition' />
      </div>
    );
  }
}
  
export default Reason;
