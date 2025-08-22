const jwt = require('jsonwebtoken');
let config = require('../config/config');
const secret = config.jwt_key;
const expiresIn = config.jwt_expires_in;

exports.generateToken = (token_data) => {
    token_data['iat'] = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        jwt.sign(token_data, secret, {
            expiresIn: expiresIn,
            algorithm: 'HS256',
            issuer: 'dairyApp',
            audience: 'dairyApp-users'
        }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
}

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}