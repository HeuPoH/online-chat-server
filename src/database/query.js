const mysql = require('mysql2/promise');

const { Settings } = require('../settings/Settings');

/**
 * Get mysql connection.
 * 
 * @returns {Object}
 */
async function query(sql, params = []) {
    const connection = await mysql.createConnection(Settings.getDB());
    const result = await connection.execute(sql, params);

    connection.end();
    return result;
}

module.exports = query;