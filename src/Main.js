import React, { Component } from 'react';
import { Button, Form, Segment, Dimmer, Loader } from 'semantic-ui-react'
import Recipients from './Recipients'
import Reason from './Reason'
import Modules from './Modules'
import { fetchModules } from './apiMethods';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingModules: true,
    }
  }
  componentDidMount() {
    const { accessToken } = this.props;
    fetchModules(accessToken)
      .then(res => {
        this.setState({ modules: res.items, isLoadingModules: false });
      })
      .catch(err => {
        this.setState({ error: err, isLoadingModules: false });
      });
  }

  render() {
    const { accessToken } = this.props;
    const { isLoadingModules, modules } = this.state;

    if (isLoadingModules) {
      return (
        <div className='anywhereRecognition'>
          <Segment inverted className='loader-segment'>
            <Dimmer inverted active>
              <Loader content='Loading' />
            </Dimmer>
          </Segment>
        </div>
      )
    }

    return (
      <div className='anywhereRecognition'>
        <Form>
          <Recipients accessToken={accessToken} />
          <Reason />
          <Modules modules={modules} />
          <Button color='green' floated='right'>
            Post
          </Button>
        </Form>
      </div>
    )
  }
}

export default Main;
