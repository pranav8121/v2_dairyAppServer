const jwt = require('jsonwebtoken');
let config = require('../config/config');
const secret = config.jwt_key;
const expiresIn = config.jwt_expires_in;

generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    return jwt.sign(payload, secret, { expiresIn: expiresIn, algorithm: 'RS256' });
}

jwt.verifyToken = (token) => {
    try {
        return jwt.verify(token, secret, { algorithms: ['RS256'] });
    } catch (error) {
        return null;
    }
}