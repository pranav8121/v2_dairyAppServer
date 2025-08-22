"use strict";
let loginModel = new (require("../model/login.model"))();
let commonFuntion = require('../../../../common_function');
module.exports = class LoginService {
    async authenticate(form_data, res) {
        let result = await loginModel.authenticate(form_data.body);
        if (result && result.length > 0) {
            delete result[0].password;
            const token = await commonFuntion.generateToken({ ...result[0] });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
            });
            return { key: 'LOGIN_SUCCESSFULLY', data: result[0] };
        } else {
            return { key: 'INVALID CREDENTIALS' };
        }
    }
}