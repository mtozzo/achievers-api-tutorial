import React, { Component } from 'react';
import { Header, Button, Segment } from 'semantic-ui-react'
import './Login.css'
import buildUrl from 'build-url';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    const loginDomain = process.env.REACT_APP_API_DOMAIN;
    const clientID = process.env.REACT_APP_CLIENT_ID;

    const authParams = {
      response_type: 'token',
      client_id: clientID,
      scope: ['read'],
      state: Math.random(),
      nonce: 'test',
    }

    const loginUrl = buildUrl(loginDomain, {
      path: '/oauth/v2/openIDConnectClient/authorize',
      queryParams: authParams,
    });

    window.open(loginUrl, 'Login to Achievers', 'width=900,height=700');
  }

  render() {
    return (
      <div className="login">
        <Header as="h4" attached="top" inverted>Anywhere Recognition</Header>
        <Segment attached>
          <div className="login-content">
            <Header as="h5">Authenticate with your Achievers account</Header>
            <Button onClick={this.onLoginClick}>
              Authenticate
            </Button>
          </div>
        </Segment>
      </div>
    );
  }
}

export default Login;