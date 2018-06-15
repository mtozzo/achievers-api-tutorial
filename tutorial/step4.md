# React Powered Achievers API App tutorial

Now that we're getting back the access token from the API we're going to need to parse it from the URL and save it as a cookie. Once it's saved by our popped up window, we're going to want to close the window and reload the original window.

import queryString from 'query-string';
import cookie from 'react-cookies';

At the top of `Login.js` add the following `import` statement.

```diff
+import queryString from 'query-string';
+import cookie from 'react-cookies';
```

```diff
   constructor(props) {
     super(props);

+    const {
+      access_token: accessToken, expires_in: expiresIn, state
+    } = queryString.parse(window.location.hash.substring(1));
+
+    if ((accessToken && expiresIn && state) && state === cookie.load('state')) {
+      cookie.save('accessToken', accessToken, { path: '/' });
+      cookie.save('expiresIn', expiresIn, { path: '/' });
+
+      window.opener.location.reload();
+      window.close();
+    }

     this.onLoginClick = this.onLoginClick.bind(this);
   }
```

Add the following to the constuctor of `App.js`:

```diff
   constructor(props) {
     super(props);
+    this.state = {
+      accessToken: cookie.load('accessToken'),
+      expiresIn: cookie.load('expiresIn'),
+    };
   }
```

And update the `render` method like so:

```diff
   render() {
+    const { accessToken } = this.state;

+    if (accessToken) {
+      return <div>{accessToken}</div>;
+    } 
     return <Login />;
   }
```

Now when your app reloads you should see your access token displayed on the page. With an actual token we can start making some API requests!

Now on to step 5.