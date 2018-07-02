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
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleModuleCriterionChange = this.handleModuleCriterionChange.bind(this);
    this.handleRecipientsChange = this.handleRecipientsChange.bind(this);

    this.state = {
      isLoadingModules: true,
    }
  }

  handleRecipientsChange(recipients) {
    this.setState({recipients: recipients.value});
  }

  handleModuleCriterionChange(criterionId) {
    this.setState({criterionId: criterionId});
  }

  handleReasonChange(reason) {
    this.setState({reason: reason});
  }

  handleSubmit = (event) => {
    const { accessToken } = this.props;
    const { reason, recipients, criterionId } = this.state;
    console.log('reason: ' + reason + ' recipients: ' + recipients + ' criterionId: ' + criterionId);
    event.preventDefault();
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
        <Form onSubmit={this.handleSubmit}>
          <Recipients accessToken={accessToken} onRecipientsChange={this.handleRecipientsChange} />
          <Reason onReasonChange={this.handleReasonChange} />
          <Modules modules={modules} onModuleCriterionChange={this.handleModuleCriterionChange} />
          <Button color='green' floated='right'>
            Post
          </Button>
        </Form>
      </div>
    )
  }
}

export default Main;
