'use strict';
const knex = require('../../../../../config/db');
const config = require('../../../../../config/config');
const sql_encKey = config.sql_encKey;
class MemberModel {

    async getAllMembers(data) {
        let { id } = data;
        const result = await knex('dairy_member')
            .select('*')
            .where({ mst_id: id });
        return result;
    }
}

module.exports = MemberModel;