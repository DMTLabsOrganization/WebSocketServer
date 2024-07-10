const express = require('express');
const { createServer } = require('http');
const WebSocketServer = require('./servers/WebSocketServer');
const PostbackHandler = require('./handlers/PostbackHandler');

const app = express();
const port = 3000;

app.use(express.json());
const server = createServer(app);
const wsServer = new WebSocketServer(server);
const postbackHandler = new PostbackHandler(wsServer);

// Обработка POST-запросов от Keitaro

// http://localhost:3000/keitaro?ip=192.168.0.1 - example of request
// http://localhost:3000/keitaro?ip={ip} - example of request for Keitaro
app.post('/keitaro', (req, res) => postbackHandler.handle(req, res));

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
