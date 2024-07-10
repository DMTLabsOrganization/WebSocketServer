class PostbackHandler {
    constructor(webSocketServer) {
        this.webSocketServer = webSocketServer;
    }

    handle(req, res) {
        const data = req.body;
        const userIp = req.query.ip; // Получаем IP-адрес пользователя из запроса

        if (!userIp) {
            res.status(400).send('IP address is required');
            return;
        }

        // Отправка сообщения "purchase" только клиенту с указанным IP-адресом
        this.webSocketServer.sendToClientByIp(userIp, { message: 'purchase' });

        res.status(200).send('Postback received');
    }
}

module.exports = PostbackHandler;
