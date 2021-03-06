import isSocket from './isSocket';


function socketAuth({dispatch}) {

  // Instantiate variable to hold socket.io:
  let socket = null;

  return next => action => {

    // Is there a payload?
    if (action.payload) {

      // Instantiate and define constants for action type and payload:
      const TYPE = action.type;
      const PAYLOAD = action.payload;

      // Is the socket.io defined and not connected?
      if (isSocket(PAYLOAD) && !PAYLOAD.connected) {

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

        /*  Function: handleConnected
        * This function dispatches the connected action,
        * where payload is connected socket.io.
        */
        const handleConnected = () => {
          dispatch({
            // Concatenate the type string property.
            type: TYPE + CONNECTED_SUFFIX,
            payload: socket,
          });
        };

        /*  Function: handleRejected
        * This function close/disconnect socket.io
        * and dispatches the reject action,
        * where payload is error rejection.
        */
        const handleRejected = (error) => {
          socket.close(); // socket.disconnect();

          dispatch({
            // Concatenate the type string property.
            type: TYPE + REJECTED_SUFFIX,
            payload: error,
          });
        };

        /*  Function: disconnectedServer
        * This function close/disconnect socket.io
        * and dispatches the disconnect action,
        * where payload is reason disconnecting.
        */
        const disconnectedServer = (reason) => {
          socket.close(); // socket.disconnect();

          dispatch({
            // Concatenate the type string property.
            type: TYPE + DISCONNECTED_SUFFIX,
            payload: reason,
          });
        };

        // If socket variable hold socket.io?
        if (socket) {

          // Remove listeners:
          socket.removeListener(CONNECT, handleConnected);
          socket.removeListener(ERROR, handleRejected);
          socket.removeListener(CONNECT_ERROR, handleRejected);
          socket.removeListener(CONNECT_TIMEOUT, handleRejected);
          socket.removeListener(DISCONNECT, disconnectedServer);

          // Reset socket variable
          socket = null;
        }

        // Save socket.io into variable.
        socket = PAYLOAD;

        // Adding listeners to move into the next middleware.
        socket.on(CONNECT, handleConnected);
        socket.on(ERROR, handleRejected);
        socket.on(CONNECT_ERROR, handleRejected);
        socket.on(CONNECT_TIMEOUT, handleRejected);
        socket.on(DISCONNECT, disconnectedServer);


        // Move into the next middleware as pending connection
        next({
          type: TYPE + PENDING_SUFFIX,
        });

        // If payload not socket.io or socket.io connected,
        // move into the next middleware.
      } else {
        next(action);
      }

      // If there's no payload, move into the next middleware.
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