const { Router } = require('express');
const { createUser, login, getUser, verifyUser } = require('../controllers/users-controller');
const multer  = require('multer')();

const router = Router();

router.post('/register', multer.single('profilePicture'), createUser);

router.post('/login', login);

router.get('/verify', verifyUser);

router.get('/:id', getUser);

module.exports = router;