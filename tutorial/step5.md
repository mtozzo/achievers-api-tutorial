# React Powered Achievers API App tutorial

I typical recognition interface within the Achievers platform looks something like the following:

![step5a](screenshots/step5a.png)

Which can be divided into three areas:

![step5a](screenshots/step5b.png)

Area 1 is where the recipient(s) for the recognition are selected and listed. Additional users that should be notified are also managed here. Area 2 is where the recognition reason is provided along with additional content such as an image or external link. Area 3 is where the recognition modules the current user has access to are listed along with the criteria options after the module is selected. We're going to want to create components that mirror these three sections. It also makes sense to have a higher level component that can be used to tie these all together and can be used as an alternate to displaying the `Login` component we already have.

First, let's start with the higher level or "main" component. Create files named `Main.js` and `Main.css` in the `src` directory. 

Add the following to the two files:

###### src/Main.js
``` 
import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import Recipients from './Recipients'
import Reason from './Reason'
import Modules from './Modules'
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className='anywhereRecognition'>
        <Form>
          <Recipients />
          <Reason />
          <Modules />
          <Button color='green' floated='right'>
            Post
          </Button>
        </Form>
      </div>
    )
  }
}

export default Main;
```

###### src/Main.css
``` 
.anywhereRecognition {
  padding: 10px;
}
```

This will result in compilation errors since the `Recipients`, `Reason` and `Modules` components don't yet exist. Let's rectify that by creating `Recipients.js`,`Recipients.css`, `Reason.js`, `Reason.css`, `Modules.js`, and `Modules.css` all in the `src` directory.

###### src/Recipients.js
``` 
import React, { Component } from 'react';
import { Header, TextArea } from 'semantic-ui-react'
import './Recipients.css';

class Recipients extends Component {
  render() {
    return (
      <div className="recipients">
      <Header as="h2" content="Who do you want to recognize?" />
      <TextArea rows={2} placeholder="Type in the name of the person you'd like to recognize" />
      </div>
    );
  }
}
  
export default Recipients;
```

###### src/Recipients.css
``` 
.recipients {
}
```

###### src/Reason.js
``` 
import React, { Component } from 'react';
import { TextArea, Header } from 'semantic-ui-react'
import './Reason.css';

class Reason extends Component {
  render() {
    return (
      <div className="reason">
        <Header as="h2" content="Personalize your message" />
        <TextArea rows={5} placeholder='Give a reason for this recognition' />
      </div>
    );
  }
}
  
export default Reason;
```

###### src/Reason.css
```
.reason {
  
}
```

###### src/Modules.js
``` 
import React, { Component } from 'react';
import { Accordion} from 'semantic-ui-react'
import './Modules.css';

class Modules extends Component {
  return (
    <div className="modules">
      <Header as="h2" content="Choose a recognition type" />
    </div>
  )
}
  
export default Modules;
```

###### src/Modules.css
```
.modules {
  
}
```

Finally, we're going to want to make an adjustment to `App.js` to load the `Main` component if the `accessToken` is set. We know that we're going to need the `accessToken` so we're going to pass it through as a prop.

At the top of `App.js` add the following `import` statement.

```diff
+import queryString from './Main';
```

and update the `render()` function to the following:

```diff
   render() {
+    if (accessToken) {
-      return <div>{accessToken}</div>;
+      return <Main accessToken={accessToken} />;
+    } 
```

After doing all of this you should have something that looks like this:

![step5c](screenshots/step5c.png)

Now we can work on actually populating the `Modules` component with data fetched from the API.

Now on to step 6.