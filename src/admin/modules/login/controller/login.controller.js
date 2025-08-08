'use strict';

const LoginModel = require('../model/login.model');

class LoginController {

    constructor() {
        this.loginModel = new LoginModel();
    }

    async login(req, res) {
        try {
            const credentials = req.body;
            const result = await this.loginModel.authenticate(credentials);
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });

        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message || 'Authentication failed'
            });
        }
    }
}

module.exports = LoginController;