'use strict';

class LoginModel {
    
    async authenticate(credentials) {
        const { id, password } = credentials;
        
        // Simple hardcoded authentication logic
        if (id === 'test' && password === 'test123') {
            return {
                success: true,
                user: {
                    id: 'test',
                    name: 'Test User',
                    role: 'admin'
                },
                token: 'simple-token-' + Date.now()
            };
        } else {
            throw new Error('Invalid credentials');
        }
    }
}

module.exports = LoginModel;