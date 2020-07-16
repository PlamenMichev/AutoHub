const env = process.env.NODE_ENV || "development";
const { generateToken } = require('../utils/auth');
const { createNewUser } = require('../services/users-service');
const config = require('../config/config')[env];

const createUser = async (req, res) => {
    const newUser = await createNewUser(req.body.email, 
        req.body.password, 
        req.body.firstName, 
        req.body.lastName, 
        req.body.phoneNumber,
        req.file);

    const token = await generateToken(newUser._id, newUser.firstName);
    res.json({
        [config.auth]: token, 
    });
};

module.exports = {
    createUser,
}