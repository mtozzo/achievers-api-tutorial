# React Powered Achievers API App tutorial

In Step 2, you will build a login form that will be presented to the user so they can authenticate with Achievers. Before you build the login form, you must add packages to the project that will aid you in building something quickly. We will also cover how to store your configuration settings in an `.env` file.


## JS Packages
You will need the following packages:
- [Semantic UI React](https://react.semantic-ui.com/) - To make a Semantic UI.
- [react-cookies](https://www.npmjs.com/package/react-cookies) - To set and access cookies.
- [build-url](https://www.npmjs.com/package/build-url) and [query-string](https://www.npmjs.com/package/query-string) - To build URLs and parse query strings.

To install these packages, press `CTRL+C` to shut down the server that you started with `yarn start`. To include the packages in your project, execute the following on the command line: 

```
yarn add semantic-ui-react
yarn add semantic-ui-css
yarn add react-cookies
yarn add build-url
yarn add query-string
```

## Storing Configuration
You'll want to keep the environments and the credentials that you use in easy to manage configuration files. We recommend following the best practices for [Adding Custom Environment Variables](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables) and creating an `.env` file to store the domain that you will connect to (so you can easily differentiate between the Achievers Sandbox and Production sites) and the associated keys.

Create a new file named `.env`  in the root of your code directory. Add the following to this file, making sure to include your actual `<yoursubdomain>` and `<yourclientid>` for the Achievers Sandbox.

Note: You must define your variables starting with `REACT_APP_` in order for them to be accessible in the provided starter app. The variables will be exposed in your JavaScript as `process.env.REACT_APP_YOUR_VARIABLE`.

###### .env
```
REACT_APP_API_DOMAIN='https://<yoursubdomain>.sandbox.achievers.com'
REACT_APP_CLIENT_ID='<yourclientid>'
```

Continue to step 3.
