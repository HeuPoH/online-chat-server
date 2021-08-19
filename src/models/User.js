const passwordHash = require('password-hash');

const query = require('../database/query');

class UserModel {
    /**
     * @param {Object} candidateData {
     *                                   nickname: string,
     *                                   password: string
     *                               }
     */
    static async saveUser(candidateData) {
        const [ userData ] = await this.getOne({ nickname: candidateData.nickname });

        if(userData.length !== 0) {
            throw new Error('Такой пользователь уже существует');
        }

        return await this.setOne(candidateData);
    }

    /**
     * @param {Object} candidateData {
     *                                    nickname: string,
     *                                    password: string
     *                               }
     * @returns {Object} {
     *                        id: number,
     *                        nickname: string,
     *                        role: number
     *                   }
     */
    static async getUser(candidateData) {
        const { nickname, password } = candidateData;
        const [ userData ] = await this.getOne({ nickname });

        if(userData.length === 0 || !passwordHash.verify(password, userData[0].password)) {
            throw new Error('Неверно введен логин или пароль');
        };

        return { ...userData[0] };
    }

    /**
     * Get one user.
     * 
     * @param {Object} param {
     *                           key: value{string}
     *                       }
     * @returns {Promise}
     */
    static async getOne(selectionBy) {
        const keys = Object.keys(selectionBy).map(field => `${field}=?`).join(' and ');
        const values = Object.values(selectionBy);

        return await query(`select * from users where ${keys}`, values);
    }

    /**
     * Save user.
     * 
     * @param {Object} candidateData {
     *                                    nickname: string,
     *                                    password: string
     *                               }
     * @returns {Promise}
     */
    static async setOne(candidateData) {
        candidateData.password = passwordHash.generate(candidateData.password);
        const fields = Object.keys(candidateData).map(field => `${field}=?`);
        const values = Object.values(candidateData);

        return await query(`insert into users set ${fields}`, values);
    }
}

module.exports = UserModel;