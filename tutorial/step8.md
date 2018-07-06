# React Powered Achievers API App tutorial

This step will focus on bringing all of the user input together in the App. 

As noted by [the React documentation](https://reactjs.org/docs/forms.html), forms work differently in React. First, try adding a handler for the `Form` component references in your `Main` component, along with the `handleSubmit()` method declaration:

###### src/Main.js

```diff
-        <Form>
+        <Form onSubmit={this.handleSubmit}>
```


```
  handleSubmit = (event) => {
    const { accessToken } = this.props;
    event.preventDefault();
  }
```

You'll notice that if you add a `console.log(this.state);` statement to the `handleSubmit()` method, you won't see any data that you could create an API request to the Achievers platform with. The official React documention explains how to get around this in their article, [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html) . Start with your `Reason` component as it's simple and then apply the same idea to the `Module` and `Recipient` components.

###### src/Reason.js

First, update the `render()` method of the `Reason` component to have an `onChange` event handler:

```diff
   render() {
     return (
       <div className="reason">
         <Header as="h2" content="Personalize your message" />
-        <TextArea rows={5} placeholder='Give a reason for this recognition' />
+        <TextArea rows={5} placeholder='Give a reason for this recognition' onChange={this.handleChange} />
       </div>
```

Next define the handler, but use `this.props` instead of `this.state`.

```
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onReasonChange(e.target.value);
  }
```

In the `Main` component you need to make accompanying changes:

###### src/Main.js

First, update the `render()` method so it has an event handler:

```diff
     return (
       <div className='anywhereRecognition'>
           <Recipients accessToken={accessToken} />
-          <Reason />
+          <Reason onReasonChange={this.handleReasonChange} />
```

Define the `handleReasonChange()` method:

```
  handleReasonChange(reason) {
    this.setState({reason: reason});
  }
```

Finally. bind it in the constructor:

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

If you type in a reason in the text area and click the "Post" button, the reason will appear in the browser console. 

Apply the same idea to the other two components. Set up the change event handlers in the `Main` component for the `Modules` and `Recipients` components in the same way you did for the `Reason` component.

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


Define the handler methods:

```
  handleRecipientsChange(recipients) {
    this.setState({recipients: recipients.value});
  }

  handleModuleCriterionChange(criterionId) {
    this.setState({criterionId: criterionId});
  }
```

Bind the methods in the contructor:

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

Update the `Recipient` component.

###### src/Recipient.js

Tap into the existing change handling function to set `this.prop`:

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

Next, update the `Module` component.

###### src/Module.js

Set `this.prop`:

```diff
  handleCriterionClick = (e, titleProps) => {
    const { index, criteriaid } = titleProps
    const { activeCriterionIndex } = this.state
    const newIndex = activeCriterionIndex === index ? -1 : index
+    this.props.onModuleCriterionChange(criteriaid);
    this.setState({ activeCriterionIndex: newIndex })
  }
```

Add the binding in the constructor:

```diff
  constructor(props) {
    super(props);
+    this.handleCriterionClick = this.handleCriterionClick.bind(this);
    this.state = {
      activeModuleIndex: -1,
      activeCriterionIndex: -1,
```


Now if you go back to the `Main` component you can reference all three of these:

```diff
  handleSubmit = (event) => {
    const { accessToken } = this.props;
+    const { reason, recipients, criterionId } = this.state;
+    console.log('reason: ' + reason + ' recipients: ' + recipients + ' criterionId: ' + criterionId);

    event.preventDefault();
  }
```

Now that you have have access to everything you need, you're nearly done.

Continue to step 9.
