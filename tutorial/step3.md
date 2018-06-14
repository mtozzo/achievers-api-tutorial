# React Powered Achievers API App tutorial

Now that we've added some packages and a `.env` file added to the project we can start building the log in form.

Create two news files in the `src` directory named `Login.js` and `Login.css`. Since the React starter project uses [Webpack](https://webpack.js.org/) we can utilize it's functionality that allows us to express that a JavaScript file depends on a CSS file. To create the relationship between the two files you simply have to `import` the CSS file in your JavaScript file. Add the following to the two files:

###### src/Login.js
``` 
import React, { Component } from 'react';
import { Header, Button, Segment } from 'semantic-ui-react'
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Header as="h4" attached="top" inverted>Anywhere Recognition</Header>
        <Segment attached>
          <div className="login-content">
            <Header as="h5">Authenticate with your Achievers account</Header>
            <Button>
              Authenticate
            </Button>
          </div>
        </Segment>
      </div>
    );
  }
}
  
export default Login;
```

###### src/Login.css
``` 
.login-content {
  width: 100%;
  height: 390px;
  text-align: center;
  padding-top: 125px;
}

.ui.attached.segment {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
```

Then make the following changes to `App.js`:

Near the top of the make the following changes to the `import` statement section.

```diff
-import logo from './logo.svg';
+import Login from './Login';
```

and update the `render()` function to the following:

```diff
  render() {
-    return (
-      <div className="App">
-        <header className="App-header">
-          <img src={logo} className="App-logo" alt="logo" />
-          <h1 className="App-title">Welcome to React</h1>
-        </header>
-        <p className="App-intro">
-          To get started, edit <code>src/App.js</code> and save to reload.
-        </p>
-      </div>
-    );
+    return <Login />;
  }
```

If you check your browser you should see something like the following:

![step1a](screenshots/step3a.png)

Clicking on the button doesn't do anything though so let's fix that.

# Adding the button click

Make the following changes to `Login.js`

At the top add the following `import` statement.
```diff
+import buildUrl from 'build-url';
```

In the previously added `render()` method change the following:

```diff
-            <Button>
+            <Button onClick={this.onLoginClick}>
```

And finally add a `constructor` and a method named `onLoginClick`:

```diff
+  constructor(props) {
+    super(props);

+    this.onLoginClick = this.onLoginClick.bind(this);
+  }
  
+  onLoginClick() {
+    const loginDomain = process.env.REACT_APP_API_DOMAIN;
+    const clientID = process.env.REACT_APP_CLIENT_ID;

+    const authParams = {
+      response_type: 'token',
+      client_id: clientID,
+      scope: ['read'],
+      state: Math.random(),
+      nonce: 'test',
+    }

+    const loginUrl = buildUrl(loginDomain, {
+      path: '/oauth/v2/openIDConnectClient/authorize',
+      queryParams: authParams,
+    });

+    console.log('loginUrl: ' + loginUrl);

+    window.open(loginUrl, 'Login to Achievers', 'width=900,height=700');
+  }
```

At this point there's enough code in place that clicking on the "Authenticate" button will pop up a login dialogue window so go ahead and restart your development server except instead of using `yarn start` you're going to want to use `HTTPS=true yarn start` so you'll have a secure connection over HTTPS instead. Logging in to your Achievers account will result in you getting prompted to authorise your App. After authenticating you'll see that your pop up window will be displaying your "Authenticate" button again but the URL will have additional information in it. It'll look something like the following:

`https://localhost:3000/#access_token=bba6732a3861f168775f3a7adc28e775d4bb9fbb&expires_in=1209600&token_type=bearer&scope=read&state=0.5060996102602306`

That's the access token we're going to want to save and use for our other requests.

Now on to step 4.
