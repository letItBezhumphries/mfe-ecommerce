# Notes from Microfrontends tutorial

when deciding what kind of history obj to use for implementing React router
the standard is to make use of Browser history in the container
and Memory history in the sub apps

**--keys to navigation--**
1 - if user click a link governed by the container's Browser History - need to communicate that change down to the subapps and the subapp Memory history needs to be updated

2 - if user clicks a link governed by the marketing app's Memory History - need to communicate that change up to the container app so that the containers Browser History updates its current path

the key to the communication will be through a onNavigate callback function that will be passed down to the marketing application when it calls the mount function

**-- centralized authentication logic inside the container --**

there is a problem with the publicPath when integrating the auth application and the container.

container will have a property `isSignedIn` which will set to false

container will pass a callback to the authentication app called `onAuthChange` so that whenever a user signs in or up
the authentication app will invoke the `onAuthChange` which will reassign the isSignedIn property to true.

remember that in order to pass the property/callback which was called `onSignIn` instead of `onAuthChange`, all I had to
do inside of the App.js file was to switch the syntax for the <Route>'s from:
<Route path="/auth/signin" component={Signin} />

to now:
`<Route path="/auth/signin"> <SignIn onSignIn={onSignIn}> </Route>`

Big gotcha for the publicPath in webpack microfrontends whenever you begin adding any nested routes like '/auth/signup/' :
`If publicPath is never set in webpack, scripts are loaded up based upon the remoteEntry.js file relative to the URL that we loaded remoteEntry.js from!!!`

so had to add the publicPath to each of the webpack.dev.js files as a property in the output object.
and in order to see the auth application in isolation you need to make sure you go to the proper url
/auth/signup or /auth/signin
