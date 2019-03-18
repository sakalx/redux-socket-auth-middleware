import socketIOClient from 'socket.io-client';

const url = 'http://localhost:8000';

const socketConnect = user =>
    socketIOClient.connect(url, {query: `user=${user}`});

export default socketConnect;