const { Router } = require('express');
const { createAd, getAds } = require('../controllers/ads-controller');
const multer  = require('multer')();

const router = Router();

router.post('/create', multer.array('photos', 15), createAd);

router.get('/getAll', getAds);

module.exports = router;