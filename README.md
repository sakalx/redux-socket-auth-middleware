# Redux socket.io authentication middleware
 ____________________________________________________
**Redux middleware for handle [socket.io](https://socket.io/) authentication.**

Inspiration from [redux-promise-middleware.](https://www.npmjs.com/package/redux-promise-middleware)
____________________________________________________
[Demo project: chat with authentication](https://socketio-auth.herokuapp.com)

### [Where should websockets and other persistent connections live?](https://redux.js.org/faq/code-structure#where-should-websockets-and-other-persistent-connections-live)

> Middleware are the right place for persistent connections like websockets in a Redux app, for several reasons:
> * Middleware exist for the lifetime of the application
> * Like with the store itself, you probably only need a single instance of a given connection that the whole app can use
> * Middleware can see all dispatched actions and dispatch actions themselves. This means a middleware can take dispatched actions and turn those into messages sent over the websocket, and dispatch new actions when a message is received over the websocket.

____________________________________________________

 Given a single action with a socketIOClient.connect payload,
 the middleware transforms the action to a separate a pending action
 and a separate connected/rejected/disconnected action.
 
```javascript
  import socketIOClient from 'socket.io-client';
    
  export const connectingToServer = () => ({
      type: 'SOCKET',
      payload: socketIOClient.connect(uri, opts),
    });
```
____________________________________________________

## Installation
First, install the middleware:

`npm i -S redux-socket-auth-middleware`

## Setup Store
Import the middleware 
and include it in applyMiddleware when creating the Redux store:

**[TIP]** You can also add [redux-logger](https://www.npmjs.com/package/redux-logger) middleware.

```javascript
  import {applyMiddleware, createStore} from 'redux';
  import socketAuth from 'redux-socket-auth-middleware';
  import logger from 'redux-logger';
  
  // Take our rootReducer/appReducer.
  import rootReducer from './reducers';
  
  // Apply middlewares, logger always in the end.
  const middleware = applyMiddleware(socketAuth, logger);
  
  // Create store with reducers and middlewares.
  const store = createStore(rootReducer, middleware);
  
  // Now we can use store in App
  export default store;
```   

## Action
Dispatch a socketIOClient.connect as the value of the payload property of the action.
```javascript
  import socketIOClient from 'socket.io-client';
  
  // Type of action:
  const SOCKET = 'SOCKET';
  
  // URL where is running a server with socket.io
  const url = 'http://localhost:8000';
  
  // Function for connecting to a server
  // with that connection we passing query string: user 
  const connect = user => socketIOClient.connect(url, {query: `user=${user}`});
  
  // const user = JSON.stringify({name: 'Soda', password: 'secret'})
  export const connectingToServer = (user = null) => ({
    type: SOCKET,
    payload: connect(user),
  });
  
    /*  Now we can use this action in App
    * user argument hold name and password as object string
    * for adding into connection as query
    */
    
    // That's it for dispatch action!
```

## Reducer

```javascript
  // Action types suffixes for socket:
  const suffix = {
    PENDING: '_PENDING',
    CONNECTED: '_CONNECTED',
    REJECTED: '_REJECTED',
    DISCONNECTED: '_DISCONNECTED',
  };

  // Action type that dispatched connectingToServer action
  const SOCKET = 'SOCKET';

  // Initialization state:
  const initState = {
    disconnected: null,
    error: null,
    fetching: false,
    io: null,
  };
  
  // Reducer for handle socket.io connection.
  export default function socket(state = initState, {type, payload}) {
    switch (type) {
  
      // Handle action socket.io connecting to a server:
      case SOCKET + suffix.PENDING:
        return ({
          ...state,
          fetching: true,
        });
  
      // Handle action socket.io connected to a server:
      // payload hold connected socket.io.
      case SOCKET + suffix.CONNECTED:
        return ({
          ...state,
          io: payload,
          fetching: false,
        });
  
      // Handle action server rejected connection:
      // payload hold error from a server.
      case SOCKET + suffix.REJECTED:
        return ({
          ...state,
          error: payload,
          fetching: false,
        });
  
      // Handle action server disconnect client-socket:
      // payload hold reason disconnected from a server.
      case SOCKET + suffix.DISCONNECTED:
        return ({
          ...state,
          disconnected: payload,
          fetching: false,
        });
    }
  
    return state;
  }

  // That's it!
```

## APP
```javascript
  import React, {useState} from 'react';
  import {bindActionCreators} from 'redux';
  import {connect} from 'react-redux';
  // import redux action function for connecting to server
  import {connectingToServer} from '../path to redux action connectingToServer';
  
  function App({socket, connectingToServer}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleChangeName = ({target}) => setName(target.value);
    const handleChangePassword = ({target}) => setPassword(target.value);
    
    const handleLogin = () => {
        const user = JSON.stringify({name, password});
        
        // Dispatch action 
        connectingToServer(user);
    };
    
    const renderStatus = () => (
      // If is a socket in redux store and is this socket connected.
      socket.io && socket.io.connected
        ? 'Connected'
        : 'Not connected'
    );
    
    // If is fetching from a server? 
    if (socket.fetching) return <h1>Loading...</h1>
      
    return (
      <div>
        <h1>{renderStatus()}</h1>
        <input value={name} onChange={handleChangeName}/>
        <input value={password} onChange={handleChangePassword}/> 
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
  
  const mapStateToProps = ({socket}) => ({
    socket,
  });
  
 
  const mapDispatchToProps = dispatch => bindActionCreators({
    connectingToServer,
  }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
  
          /* When we get a connection with a server:
           * redux store will hold socket.io,
           * so we can listen or emit events.
           * socket.io.on('some event', callback)
           * socket.io.emit('some event', arguments) 
           * just connect redux to component 
           * and mapStateToProps to get access to socket.io
           */
```
____________________________________________________

### [Server-side socket.io authentication](https://socket.io/docs/migrating-from-0-9/)

```javascript
 io.use(function(socket, next) {
   var handshakeData = socket.request;
   // make sure the handshake data looks good as before
   // if error do this:
     // next(new Error('not authorized'));
   // else just call next
   next();
 });
```
*[Example of implementation.]( https://github.com/sakalx/redux-socket-auth-middleware/tree/example-chat)*
 
 ____________________________________________________
 
### Issues
 For bug reports and feature requests, file an issue on [GitHub.](https://github.com/sakalx/redux-socket-auth-middleware/issues/new)
 ____________________________________________________
 
### License
  [Code licensed with the MIT License (MIT).](https://github.com/sakalx/redux-socket-auth-middleware/blob/master/LICENSE)
 ____________________________________________________
