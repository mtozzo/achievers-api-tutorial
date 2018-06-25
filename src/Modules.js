import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import './Modules.css';

class Modules extends Component {
  render() {
    return (
      <div className="modules">
        <Header as="h2" content="Choose a recognition type" />
      </div>
    )
  }
}
  
export default Modules;
