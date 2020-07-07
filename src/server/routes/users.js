const { Router } = require('express');
const { generateToken } = require('../utils/auth');

const router = Router();

router.get('/', async (req, res) => {
    const token = await generateToken(1, "Plamen");
    res.status(200).json({
        token,
    });
});

module.exports = router;