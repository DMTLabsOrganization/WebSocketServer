const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const port = 3000;

// Настройка Body Parser для обработки JSON-запросов
app.use(bodyParser.json());

// Настройка WebSocket-сервера
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Обработка POST-запросов от Keitaro
app.post('/keitaro', (req, res) => {
    const data = req.body;

    // Отправка сообщения всем подключенным клиентам WebSocket
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });

    res.status(200).send('Postback received');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
