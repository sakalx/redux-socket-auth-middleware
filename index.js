import isSocket from './isSocket';


function socketAuth(ref) {
  const {dispatch} = ref;

  return next => action => {

    // Instantiate and define constants for action type
    const TYPE = action.type;

    // Is there a payload?
    if (action.payload) {
      const PAYLOAD = action.payload;

      // Is the socket.io defined?
      if (isSocket(PAYLOAD)) {

        // Instantiate variable to hold socket.io:
        let socket;

        // Instantiate and define constants for the socket.io events.
        // [https://socket.io/docs/client-api]
        const CONNECT = 'connect';
        const ERROR = 'error';
        const CONNECT_ERROR = 'connect_error';
        const CONNECT_TIMEOUT = 'connect_timeout';
        const DISCONNECT = 'disconnect';

        // Instantiate and define constants for the action type suffixes.
        // These are appended to the end of the action type.
        const PENDING_SUFFIX = '_PENDING';
        const CONNECTED_SUFFIX = '_CONNECTED';
        const REJECTED_SUFFIX = '_REJECTED';
        const DISCONNECTED_SUFFIX = '_DISCONNECTED';

        // Function: handleConnected
        // This function dispatches the connected action
        // where payload is connected socket.io
        const handleConnected = () => {
          return next({
            type: TYPE + CONNECTED_SUFFIX, // // Concatenate the type string property.
            payload: socket,
          });
        };

        // Function: handleRejected
        // This function dispatches the rejected connection action
        // where payload is error rejection
        const handleRejected = (error) => {
          socket.close(); // socket.disconnect();
          return next({
            type: TYPE + REJECTED_SUFFIX,
            payload: error,
          });
        };

        // Function: disconnectedServer
        // This function dispatches the disconnected server action
        // where payload is reason disconnecting
        // and close/disconnect socket.io
        const disconnectedServer = (reason) => {
          socket.close(); // socket.disconnect();

          return next({
            type: TYPE + DISCONNECTED_SUFFIX,
            payload: reason,
          });
        };

        // Is socket.io in variable
        if (socket) {

          // Remove previous listeners
          socket.removeListener(CONNECT, handleConnected);
          socket.removeListener(ERROR, handleRejected);
          socket.removeListener(CONNECT_ERROR, handleRejected);
          socket.removeListener(CONNECT_TIMEOUT, handleRejected);
          socket.removeListener(DISCONNECT, disconnectedServer);

          // Move on to next action
          //next(action);

          // Save socket.io into variable
        } else {
          socket = PAYLOAD;

          // First, dispatch the pending action:
          next({
            type: TYPE + PENDING_SUFFIX,
          });

          // Second, add listeners and dispatch a rejected or connect or disconnect action
          // and move on to the next middleware.
          socket.on(CONNECT, handleConnected);
          socket.on(ERROR, handleRejected);
          socket.on(CONNECT_ERROR, handleRejected);
          socket.on(CONNECT_TIMEOUT, handleRejected);
          socket.on(DISCONNECT, disconnectedServer);
        }
      }

      // If there's no payload, move on to the next middleware.
    } else {
      next(action);
    }
  }
}

export default function middleware({dispatch} = {}) {
  if (typeof dispatch === 'function') {
    return socketAuth({dispatch});
  }

  return null;
}