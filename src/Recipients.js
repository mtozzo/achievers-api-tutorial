import React, { Component } from 'react';
import { Header, TextArea } from 'semantic-ui-react'
import './Recipients.css';

class Recipients extends Component {
  render() {
    return (
      <div className="recipients">
      <Header as="h2" content="Who do you want to recognize?" />
      <TextArea rows={2} placeholder="Type in the name of the person you'd like to recognize" />
      </div>
    );
  }
}
  
export default Recipients;
