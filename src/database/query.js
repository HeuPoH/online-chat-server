const mysql = require('mysql2/promise');

const { dbSettings } = require('../settings/settings');

/**
 * Get mysql connection.
 * 
 * @returns {Object}
 */
async function query(sql, params = []) {
    const connection = await mysql.createConnection(dbSettings());
    const result = await connection.execute(sql, params);

    connection.end();
    return result;
}

module.exports = query;