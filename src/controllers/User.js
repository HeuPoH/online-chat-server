const UserModel = require("../models/User");

class UserController {
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
            return { errorMessage: error.message };
        }
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
            return { errorMessage: error.message };
        }
    }

    /**
     * Registration
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    static async signUp(req, res) {
        try {
            await UserModel.saveUser(req.body);

            res.json({ message: 'Успешная регистрация' });
        } catch(error) {
            res.status(400).json({ errorMessage: error.message });
        }
    }

    /**
     * Sign out from account.
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    static async signOut(req, res) {
        //Delete session from db.
        req.session.destroy()
        req.logout();
        res.json({ message: 'Сессия удалена' });
    }
}

module.exports = UserController;