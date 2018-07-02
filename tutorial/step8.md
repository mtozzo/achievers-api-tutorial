# React Powered Achievers API App tutorial

This step will focus on bringing all of the user input together in on our App. 

As noted by [the React documentation](https://reactjs.org/docs/forms.html), forms work a little differently in React. First we try adding a handler for the `Form` component references in our `Main` component:

###### src/Main.js

```diff
-        <Form>
+        <Form onSubmit={this.handleSubmit}>
```

along with the `handleSubmit()` method declaration:

```
  handleSubmit = (event) => {
    const { accessToken } = this.props;
    event.preventDefault();
  }
```

You'll notice that if you add a `console.log(this.state);` statement to the `handleSubmit()` method you won't actually see any data that you could actually create an API request to the Achievers platform with. The official React documention explains how to get around this in their article that explains the concept of [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html) . We'll do this first with our `Reason` component as it's fairly simple and then we'll apply the same idea to the `Module` and `Recipient` components.

###### src/Reason.js

First, we update the `render()` method of `Reason` component to have an `onChange` event handler:

```diff
   render() {
     return (
       <div className="reason">
         <Header as="h2" content="Personalize your message" />
-        <TextArea rows={5} placeholder='Give a reason for this recognition' />
+        <TextArea rows={5} placeholder='Give a reason for this recognition' onChange={this.handleChange} />
       </div>
```

next we define the handler but use `this.props` instead of `this.state`.

```
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onReasonChange(e.target.value);
  }
```

Back in the Main component we need to make accompanying changes.

###### src/Main.js

First, update the `render()` method so it has an event handler:

```diff
     return (
       <div className='anywhereRecognition'>
           <Recipients accessToken={accessToken} />
-          <Reason />
+          <Reason onReasonChange={this.handleReasonChange} />
```

define the method `handleReasonChange()` method:

```
  handleReasonChange(reason) {
    this.setState({reason: reason});
  }
```

and finally bind it in the constructor:

```diff
  constructor(props) {
    super(props);
+    this.handleReasonChange = this.handleReasonChange.bind(this);

    this.state = {
      isLoadingModules: true,
    }
  }
```

Now, you can do something like the following in the `handleSubmit()` method:

```diff
  handleSubmit = (event) => {
    const { accessToken } = this.props;
+    const { reason } = this.state;
+    console.log('reason: ' + reason);
    event.preventDefault();
  }
```  

Now if you type in a reason in to the text area and click the "Post" button, the reason you typed will show up in the browser console. 

Next, we apply the same idea to our two other components. Set up the change event handlers in the `Main` component for the `Modules` and `Recipients` components in the same way we did for the `Reason` component.

###### src/Main.js

First, set the handlers on the components:

```diff
        <Form>
-          <Recipients accessToken={accessToken} />
+          <Recipients accessToken={accessToken} onRecipientsChange={this.handleRecipientsChange} />
          <Reason onReasonChange={this.handleReasonChange} />
-          <Modules modules={modules} />
+          <Modules modules={modules} onModuleCriterionChange={this.handleModuleCriterionChange} />
```


define the handler methods:

```
  handleRecipientsChange(recipients) {
    this.setState({recipients: recipients.value});
  }

  handleModuleCriterionChange(criterionId) {
    this.setState({criterionId: criterionId});
  }
```

and finally bind the methods in the contructor:

```diff
  constructor(props) {
    super(props);
    this.handleReasonChange = this.handleReasonChange.bind(this);
+    this.handleModuleCriterionChange = this.handleModuleCriterionChange.bind(this);
+    this.handleRecipientsChange = this.handleRecipientsChange.bind(this);

    this.state = {
      isLoadingModules: true,
    }
  }
```

Now we'll update the `Recipient` component.

###### src/Recipient.js

We'll tap into the existing change handling function to set `this.prop`:

```diff
  handleRecipientsChange(e, { value }) {
    this.setState({ value });
+    this.props.onRecipientsChange({ value });  
  }
```

Then add a constructor to bind the method:

```
  constructor(props) {
    super(props);
    this.handleRecipientsChange = this.handleRecipientsChange.bind(this);
  }

```

Next we'll update the `Module` component.

###### src/Module.js

Again, we set `this.prop`:

```diff
  handleCriterionClick = (e, titleProps) => {
    const { index, criteriaid } = titleProps
    const { activeCriterionIndex } = this.state
    const newIndex = activeCriterionIndex === index ? -1 : index
+    this.props.onModuleCriterionChange(criteriaid);
    this.setState({ activeCriterionIndex: newIndex })
  }
```

and add the binding in the constructor:

```diff
  constructor(props) {
    super(props);
+    this.handleCriterionClick = this.handleCriterionClick.bind(this);
    this.state = {
      activeModuleIndex: -1,
      activeCriterionIndex: -1,
```


Now if we go back to our Main component we can reference all three of these things they'll  be available:

```diff
  handleSubmit = (event) => {
    const { accessToken } = this.props;
+    const { reason, recipients, criterionId } = this.state;
+    console.log('reason: ' + reason + ' recipients: ' + recipients + ' criterionId: ' + criterionId);

    event.preventDefault();
  }
```

Now that we have have access to everything we need We're finally in the home stretch!

On to step 9.
