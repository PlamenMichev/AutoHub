const { Router } = require('express');
const { createUser, login } = require('../controllers/users-controller');
const { authenticateUser } = require('../utils/auth');
const multer  = require('multer')();

const router = Router();

router.post('/create', multer.single('profilePicture'), createUser);

router.post('/login', login);

router.get('/auth', authenticateUser, async (req, res) => {
    res.status(200).json({
        message: 'Everything is ok!',
    });
});

module.exports = router;