const { Router } = require('express');
const { createUser } = require('../controllers/users-controller');
const { generateToken, authenticateUser } = require('../utils/auth');
const multer  = require('multer')();

const router = Router();

router.post('/create', multer.single('profilePicture'), createUser);

router.get('/create', async (req, res) => {
    const token = await generateToken(1, "Plamen");
    res.status(200).json({
        token,
    });
});

router.get('/auth', authenticateUser, async (req, res) => {
    res.status(200).json({
        message: 'Everything is ok!',
    });
});

module.exports = router;