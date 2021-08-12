function dbSettings() {
    return {
        host : 'localhost',
        user : 'mysql',
        password: 'mysql',
        database: 'test'
    }
}

function mysqlSessionSettings() {
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
    }
}

function sessionSettings(store) {
    return {
        store,
        resave: true,
        saveUninitialized: false,
        secret: 'SECRET',
        cookie: {
            httpOnly: true,
        }
    }
}

module.exports = { dbSettings, mysqlSessionSettings, sessionSettings };