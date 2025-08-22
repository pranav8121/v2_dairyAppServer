"use strict";
let memberModel = new (require("../model/member.model"))();
module.exports = class MemberService {
    async getAllMembers(form_data, res) {
        let result = await memberModel.getAllMembers(form_data.query);
        if (result && result.length > 0) {
            return { key: 'DATA_FOUND', data: result };
        } else {
            return { key: 'DATA_NOT_FOUND' };
        }
    }
}