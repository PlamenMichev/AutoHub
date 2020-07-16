const env = process.env.NODE_ENV || "development";
const { generateToken } = require('../utils/auth');
const { createNewUser, checkUser } = require('../services/users-service');
const config = require('../config/config')[env];

const createUser = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        if (!password || password.length < 5) {
            res.status(400).json({
                message: 'Password is too short!', 
            });
        }

        if (!email) {
            res.status(400).json({
                message: 'Email is required!', 
            });
        }

        if (!firstName) {
            res.status(400).json({
                message: 'First name is too short!', 
            });
        }

        if (!lastName) {
            res.status(400).json({
                message: 'Last name is too short!', 
            });
        }

        const newUser = await createNewUser(email, 
            password, 
            firstName, 
            firstName, 
            lastName,
            req.file);

        const token = await generateToken(newUser._id, newUser.firstName);
        res.status(200).json({
            [config.auth]: token, 
        });
    } catch (error) {
        res.status(400).json({
            message: error.message, 
        });
    }
};

const login = async (req, res) => {
    const user = await checkUser(req.body.email, req.body.password);
    if (user) {
        const token = await generateToken(user._id, user.firstName);
        res.status(200).json({
            [config.auth]: token, 
        });
    } else {
        res.status(400).json({
            message: 'Invalid email or password!', 
        });
    }
}

module.exports = {
    createUser,
    login,
}