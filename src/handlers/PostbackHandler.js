const { Console } = require("console");

class PostbackHandler {
    constructor(webSocketServer) {
        this.webSocketServer = webSocketServer;
    }

    handle(req, res) {
        const data = req.body;
        this.webSocketServer.broadcast(data);
        
        // Отправка сообщения "purchase" всем клиентам при успешном POST-запросе
        this.webSocketServer.broadcast({ message: 'purchase' });

        console.log("PRISHLO!!!!");

        res.status(200).send('Postback received');
    }
}

module.exports = PostbackHandler;
