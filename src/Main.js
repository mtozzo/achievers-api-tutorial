import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import Recipients from './Recipients'
import Reason from './Reason'
import Modules from './Modules'
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className='anywhereRecognition'>
        <Form>
          <Recipients />
          <Reason />
          <Modules />
          <Button color='green' floated='right'>
            Post
          </Button>
        </Form>
      </div>
    )
  }
}

export default Main;
