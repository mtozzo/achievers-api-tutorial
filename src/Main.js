import React, { Component } from 'react';
import { Button, Form, Segment, Dimmer, Loader, Message } from 'semantic-ui-react'
import Recipients from './Recipients'
import Reason from './Reason'
import Modules from './Modules'
import _ from 'lodash';
import { fetchModules, postRecognition } from './apiMethods';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleModuleCriterionChange = this.handleModuleCriterionChange.bind(this);
    this.handleRecipientsChange = this.handleRecipientsChange.bind(this);

    this.state = {
      isLoadingModules: true,
      isDoneSuccessfullySendingRecognition: false,
      errors: [],
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

    if (!accessToken || !recipients || !reason || !criterionId) {
      const errors = ['Please ensure you\'ve selected one or more recipients, entered a reason and selected a criterion for your recognition.'];
      this.setState({errors: errors});
    } else {
      postRecognition(accessToken, recipients, reason, criterionId)
        .then(res => {
          this.setState({ errors: [], newsfeedEventURL: res.newsfeedEventURL, isDoneSuccessfullySendingRecognition: true });
        })
        .catch(err => {
          this.setState({ error: err });
        });
    }
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
    const { isLoadingModules, isDoneSuccessfullySendingRecognition, newsfeedEventURL, modules, errors } = this.state;

    if (isDoneSuccessfullySendingRecognition) {
      return (
        <div className='anywhereRecognition'>
        <Message positive>
          <Message.Header>Recognition sent!</Message.Header>
          <p>Your recognition was sent succesfully! You can view it by visiting:</p>
          <a href={newsfeedEventURL} target='_blank'>{newsfeedEventURL}</a>
        </Message>
        </div>
      )
    }

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
        <Message error header='Problem perfoming recognition' hidden={_.isEmpty(errors)} list={errors} />
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
