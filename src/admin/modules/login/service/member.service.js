"use strict";
let loginModel = new (require("../model/login.model"))();
// const { generateUniqueId } = require('../../../../common/common_functions');
module.exports = class LoginService {
    async authenticate(form_data) {
        let result = await loginModel.authenticate(form_data);
        if (result && result.length > 0) {
            return { key: 'LOGIN_SUCCESSFULLY', data: result[0] };
        } else {
            return { key: 'INVALID CREDENTIALS' };
        }
    }
}