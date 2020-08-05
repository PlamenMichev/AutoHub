const env = process.env.NODE_ENV || 'development';
const { generateToken } = require('../utils/auth');
const { createNewUser, checkUser, getUserById } = require('../services/users-service');
const config = require('../config/config')[env];
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNumber = req.body.phoneNumber;
        
        if (!password || password.length < 5) {
            return res.status(400).json({
                message: 'Password is too short!', 
            });
        }

        if (!email) {
            return res.status(400).json({
                message: 'Email is required!', 
            });
        }

        if (!firstName) {
            return res.status(400).json({
                message: 'First name is too short!', 
            });
        }

        if (!lastName) {
            return res.status(400).json({
                message: 'Last name is too short!', 
            });
        }

        const newUser = await createNewUser(email, 
            password, 
            firstName, 
            lastName, 
            phoneNumber,
            req.file);
            
        const token = await generateToken(newUser._id, newUser.firstName);
        res
            .status(200)
            .header(config.auth, token)
            .send(newUser);
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

        res
            .status(200)
            .header(config.auth, token)
            .send(user);
    } else {
        res.status(400).json({
            message: 'Invalid email or password!', 
        });
    }
}

const getUser = async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const user = await getUserById(req.params.id);

    if (user) {
        res.status(404)
            .json(user);
    } else {
        res.status(404)
            .json({
                message: 'User not found!',
            });
    }
}

const verifyUser = async (req, res) => {
    const token = req.headers[config.auth];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        console.log('hui', decodedToken);
        return res
                .send({
                    status: true,
                    user: {
                        _id: decodedToken.id,
                        firstName: decodedToken.firstName,
                    }
                });
    } catch (error) {
        res.send({status: false});
    }
}

module.exports = {
    createUser,
    login,
    getUser,
    verifyUser,
}