const WebSocket = require('ws');

class WebSocketServer {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.wss.on('connection', this.handleConnection.bind(this));
    }

    handleConnection(ws) {
        console.log("Client joined.");
        ws.on('message', this.handleMessage.bind(this));
        ws.on('close', this.handleClose.bind(this, ws));
        ws.on('error', this.handleError.bind(this));
    }

    handleMessage(message) {
        if (typeof message === "string") {
            console.log("String received from client -> '" + message + "'");
        } else {
            console.log("Binary received from client -> " + Array.from(message).join(", "));
        }
    }

    handleClose(ws) {
        console.log("Client left.");
    }

    handleError(error) {
        console.error("WebSocket error:", error);
    }

    broadcast(data) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}

module.exports = WebSocketServer;
