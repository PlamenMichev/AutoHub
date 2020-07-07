const jwt = require('jsonwebtoken');

const generateToken = async (id, username) => {
    const token = await jwt.sign({
        id,
        username,
    }, process.env.JWT_KEY);

    return token;
}

module.exports = {
    generateToken,
}