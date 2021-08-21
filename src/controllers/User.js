const UserModel = require("../models/User");

class UserController {
    /**
    * Registration.
    * 
    * @param {Object} req 
    * @param {Object} res 
    */
    static async signUp(req, res) {
        try {
            await UserModel.saveUser(req.body);

            res.json({ message: 'Успешная регистрация' });
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Authentication.
     * If the data is correct return user data else
     * return message.
     * 
     * @param {Object} candidateData {
     *                                   nickname: string,
     *                                   password: string
     *                               }
     * @returns {Promise}
     */
    static async signIn(candidateData) {
        try {
            return await UserModel.getUser(candidateData);
        } catch(error) {
            return { error: error.message };
        }
    }

    /**
     * Sign out from account.
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    static signOut(req, res) {
        //Delete session from db.
        req.session.destroy()
        req.logout();
        res.json({ message: 'Сессия удалена' });
    }

    /**
     * Checking user in db by field
     * 
     * @param {Object} selectionBy
     * @returns {Promise}
     */
    static async getOneUser(selectionBy) {
        try {
            return await UserModel.getOne(selectionBy);
        } catch(error) {
            return { error: error.message };
        }
    }
}

module.exports = UserController;