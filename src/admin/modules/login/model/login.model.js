'use strict';
const knex = require('../../../../../config/db');
const config = require('../../../../../config/config');
const sql_encKey = config.sql_encKey;
class LoginModel {

    async authenticate(data) {
        const { username, password } = data;

        const result = await knex('admin_users')
            .select(
            '*',
            knex.raw('CAST(AES_DECRYPT(password, ?) AS CHAR) AS password', [sql_encKey])
            )
            .where({ username });
        return result;
    }
}

module.exports = LoginModel;