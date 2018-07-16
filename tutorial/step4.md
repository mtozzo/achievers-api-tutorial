# React Powered Achievers API App tutorial

You will need to extract the access token from the URL and save it as a cookie. Once you have done this, close the window and reload the original window.

https://localhost:3000/#access_token=bba6732a3861f168775f3a7adc28e775d4bb9fbb&expires_in=1209600&token_type=bearer&scope=read&state=0.5060996102602306

At the top of `Login.js` add the following `import` statements:

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

And update the `render` method as follows:

```diff
   render() {
+    const { accessToken } = this.state;

+    if (accessToken) {
+      return <div>{accessToken}</div>;
+    } 
     return <Login />;
   }
```

Now when your app reloads you should see your access token displayed on the page. With an actual token we can start making some API requests. First, take a quick detour to create the components that will be displayed when you're logged in.

Continue to step 5.
