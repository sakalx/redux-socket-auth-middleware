import socketIOClient from 'socket.io-client';

const DEV_URL = 'http://localhost:8000';
const PROD_URL = 'http://localhost:8000';
const URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;

const socketConnect = user =>
    socketIOClient.connect(URL, {query: `user=${user}`});

export default socketConnect;