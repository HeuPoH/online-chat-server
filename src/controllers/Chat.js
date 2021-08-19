const ChatModel = require("../models/Chat");

class ChatController {
    static async getMessages(req, res) {
        try {
            const [ messages, count ] = await ChatModel.getMessages(req.query.startRange);

            res.json({ messages: messages[0], count: count[0][0].count });
        } catch(error) {
            res.status(500).json({ errorMessage: 'Ошибка сервера' });
        }
    }

    /**
     * 
     * @param {Object} item {
     *                          id_user: number,
     *                          message: string
     *                          date: number
     *                      }
     * @returns 
     */
    static async addMessage(item) {
        try {
            return await ChatModel.saveMessage(item);
        } catch(error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 
     * @param {number} idMessage 
     * @returns 
     */
    static async deleteMessage(idMessage) {
        try {
            await ChatModel.deleteMessage(idMessage);
            return true;
        } catch(error) {
            return false;
        }
    }
}

module.exports = ChatController;