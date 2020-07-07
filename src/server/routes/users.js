const { Router } = require('express');
const { generateToken, authenticateUser } = require('../utils/auth');

const router = Router();

router.get('/', async (req, res) => {
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