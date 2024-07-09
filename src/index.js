const express = require('express');
const { createServer } = require('http');
const WebSocketServer = require('./servers/WebSocketServer');
const PostbackHandler = require('./handlers/PostbackHandler');

const app = express();
const port = 3000;

// Настройка Body Parser для обработки JSON-запросов
app.use(express.json());

// Создание HTTP-сервера
const server = createServer(app);

// Создание и настройка WebSocket сервера
const wsServer = new WebSocketServer(server);

// Создание обработчика Postback запросов
const postbackHandler = new PostbackHandler(wsServer);

// Обработка POST-запросов от Keitaro
app.post('/keitaro', (req, res) => postbackHandler.handle(req, res));

// Запуск HTTP-сервера
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
