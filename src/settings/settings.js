class Settings {
    static getDB() {
        return {
            host : 'localhost',
            user : 'mysql',
            password: 'mysql',
            database: 'test'
        };
    }

    static getSession(MySQLStore) {
        const store = new MySQLStore({ ...this.getDB(), ...this.#getMySQLSession() });

        return {
            store,
            resave: true,
            saveUninitialized: false,
            secret: 'waf@M!O',
            cookie: {
                httpOnly: true,
            }
        };
    }

    static #getMySQLSession() {
        return {
            charset: 'utf8mb4_bin',
            clearExpired: true,
            schema: {
                tableName: 'sessions',
                columnNames: {
                    session_id: 'session_id',
                    expires: 'expires',
                    data: 'data'
                }
            }
        };
    }
}

module.exports = { Settings };