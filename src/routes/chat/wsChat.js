const ChatController = require("../../controllers/Chat");
const WSocketClients = require("../../extensions/WSocketClients");
const store = WSocketClients.create();

function wsChat(ws, req) {
    store.push(ws);

    ws.on('message', async message => {
        const item = { id_user: req.user.id, message, date: Date.now() };
        const result = await ChatController.addMessage(item);

        if(result) {
            store.getClients().forEach(client => {
                if(client.OPEN) client.send(JSON.stringify({ id: result[0].insertId, ...item, nickname: req.user.nickname }));
            });
        }
    });

    ws.on('close', () => store.delete(ws));
}

module.exports = wsChat;