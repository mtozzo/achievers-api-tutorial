# React Powered Achievers API App tutorial

We're now going to want to build a log in form that will be presented to the user so they can authenticate with Achievers. Before we do that though, we're going to want to add some packages to the project that will help us build something quickly. We're also going to want a method for storing some configuration. 


## JS Packages
We want to make a nice semantic UI so we're going to use a yarn package called [Semantic UI React](https://react.semantic-ui.com/). We're also going to need to set and access cookies for which we're going to use [react-cookies](https://www.npmjs.com/package/react-cookies). We're also going to need to build URLs and parse query strings so we'll use [build-url](https://www.npmjs.com/package/build-url) and [query-string](https://www.npmjs.com/package/query-string).

To install these things we're going to need to press `CTRL+C` to shut down the server that you started with `yarn start`. To include the aformentioned packages in our project execute the following on the command line. 

```
yarn add semantic-ui-react
yarn add react-cookies
yarn add build-url
yarn add query-string
```

## Storing Configuration
We're also going to want to keep the enviroments we connect to and the credentials we use in easy to manage configuration files so we're going to follow the recommended best practice for [Adding Custom Environment Variables](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables) and create a `.env` file to store the domain we're going to be connecting to (so we can easily differentiate between the Achievers Sandbox and Production sites) and the associated keys.

Create a new file in root of your code directory named `.env`. Add the following to this file while filling in your actual `<yoursubdomain>` and `<yourclientid>` for the Achievers Sandbox:

###### .env
```
REACT_APP_API_DOMAIN='https://<yoursubdomain>.sandbox.achievers.com'
REACT_APP_CLIENT_ID='<yourclientid>'
```

Please note that you must define your variables starting with `REACT_APP_` in order for them to be accesible in the provided starter app. The variables will be exposed in your JavaScript as `process.env.REACT_APP_YOUR_VARIABLE`.

Now on to step 3.
