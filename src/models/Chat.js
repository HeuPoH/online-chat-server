const query = require('../database/query');
const { Settings } = require('../settings/Settings');

class ChatModel {
    /**
     * Get messages.
     * 
     * @param {number} startRange 
     * @returns {Promise}
     */
    static async getMessages(startRange) {
        const countOnPage = Settings.chat().countOnPage;

        return await Promise.all([
            query(`select chat.*, users.nickname from chat join
                            users on chat.id_user=users.id order by id desc limit ${startRange}, ${countOnPage}`),
            query(`select count(*) as count from chat`)
        ]);
    }

    /**
     * @param {Object} item {
     *                          id_user: number,
     *                          message: string,
     *                          date: number
     *                      }
     * @returns {Promise}
     */
    static async saveMessage(item) {
        const fields = Object.keys(item).map(field => `${field}=?`);
        const values = Object.values(item);

        return await query(`insert into chat set ${fields}`, values);
    }

    /**
     * @param {number} idMessage 
     * @returns {Promise}
     */
    static async deleteMessage(idMessage) {
        return await query(`delete from chat where id=?`, [ idMessage ]);
    }
}

module.exports = ChatModel;