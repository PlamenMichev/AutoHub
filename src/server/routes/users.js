const { Router } = require('express');
const { generateToken, authenticateUser } = require('../utils/auth');
const { uploadImage } = require('../utils/cloudinary');
var multer  = require('multer')();

const router = Router();

router.post('/', multer.single('image'), async (req, res) => {
    const result = await uploadImage(req.file);
    return res.status(200).json({imageUrl: result});
});

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