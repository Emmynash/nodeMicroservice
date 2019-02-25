const jwt = require('jsonwebtoken');

let authenticate = (req, res, next) => {

    let token = req.header('x-auth');
    let decoded;

    try {
        decoded = jwt.verify(token, "tokenfy");
        next();
    } catch (error) {
        res.status(401).send();

        return Promise.reject(error);
    }
}

module.exports = { authenticate };