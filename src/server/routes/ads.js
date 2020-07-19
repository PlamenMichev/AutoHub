const { Router } = require('express');
const { createAd } = require('../controllers/ads-controller');
const multer  = require('multer')();

const router = Router();

router.post('/create', multer.array('photos', 15), createAd)

module.exports = router;