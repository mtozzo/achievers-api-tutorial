import React, { Component } from 'react';
import { Header, Button, Segment } from 'semantic-ui-react'
import './Login.css'
import buildUrl from 'build-url';
import queryString from 'query-string';
import cookie from 'react-cookies';

class Login extends Component {
  constructor(props) {
    super(props);

    const {
      access_token: accessToken, expires_in: expiresIn, state
    } = queryString.parse(window.location.hash.substring(1));

    console.log(window.location.hash);
    console.log({accessToken, expiresIn, state});

    if ((accessToken && expiresIn && state) && state === cookie.load('state')) {
      cookie.save('accessToken', accessToken, { path: '/' });
      cookie.save('expiresIn', expiresIn, { path: '/' });

      window.opener.location.reload();
      window.close();
    }

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    const loginDomain = process.env.REACT_APP_API_DOMAIN;
    const clientID = process.env.REACT_APP_CLIENT_ID;

    const authParams = {
      response_type: 'token',
      client_id: clientID,
      scope: 'write read',
      state: Math.random(),
      nonce: 'test',
    }

    const loginUrl = buildUrl(loginDomain, {
      path: '/oauth/v2/openIDConnectClient/authorize',
      queryParams: authParams,
    });
    
    cookie.save('state', authParams.state, { path: '/' });

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