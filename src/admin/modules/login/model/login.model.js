'use strict';
const knex = require('../../../../../config/db');
const config = require('../../../../../config/config');
const sql_encKey = config.sql_encKey;
class LoginModel {

    async authenticate(data) {
        const { username, password } = data;

        const result = await knex('admin_users')
            .select(
                '*'            )
            .where({
                username: username
            }).whereRaw('AES_DECRYPT(password, ?) = ?', [sql_encKey, password]);
        return result;
    }
}

module.exports = LoginModel;