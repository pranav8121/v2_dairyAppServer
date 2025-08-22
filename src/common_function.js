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
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, { algorithm: 'HS256' }, (err, token_info) => {
            let token_data = {
                err: err,
                token_info: token_info
            }
            resolve(token_data);
        });
    });
}