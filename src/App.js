import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import cookie from 'react-cookies';
import 'semantic-ui-css/semantic.min.css';
import { Header, Button, Segment } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: cookie.load('accessToken'),
      expiresIn: cookie.load('expiresIn'),
    };
  }

  render() {
    const { accessToken } = this.state;
    console.log(this.state);

    if (accessToken) {
      return <div>{accessToken}</div>;
    } 
    return <Login />;
  }
}

export default App;
