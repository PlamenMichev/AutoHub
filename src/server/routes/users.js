const { Router } = require('express');
const { createUser, login, getUser } = require('../controllers/users-controller');
const { authenticateUser } = require('../utils/auth');
const multer  = require('multer')();

const router = Router();

router.post('/register', multer.single('profilePicture'), createUser);

router.post('/login', login);

router.get('/:id', getUser);

router.get('/:id', getUser);

router.post('/auth', async (req, res) => {
    console.log(req.body.plamen);
    res.status(200).json({
        message: 'Everything is ok!',
    });
});

module.exports = router;