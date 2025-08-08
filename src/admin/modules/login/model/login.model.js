'use strict';

class LoginModel {

    async authenticate(credentials) {
        const { id, password } = credentials;
        if (id === 'test' && password === 'test123') {
            return [{ id: 'test', name: 'Test User', role: 'admin' }];
        } else {
            return [];
        }
    }
}

module.exports = LoginModel;