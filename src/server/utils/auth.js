const env = process.env.NODE_ENV || "development";
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];

const generateToken = async (id, firstName) => {
    const token = await jwt.sign({
        id,
        firstName,
    }, process.env.JWT_KEY);

    return token;
}

const authenticateUser = async (req, res, next) => {
    const authHeaders = req.headers[config.auth];
    if (!authHeaders) {
        return res
                .status(401)
                .json({
                    message: 'Not Authorized',
                });
    }

    const token = authHeaders.split(' ')[1];
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        req.userId = decodedToken.userId;
        req.username = decodedToken.username;

        return next();
    } catch (error) {
        return res
                .status(401)
                .json({
                    message: 'Not authorized',
                });
    }
}

module.exports = {
    generateToken,
    authenticateUser,
}