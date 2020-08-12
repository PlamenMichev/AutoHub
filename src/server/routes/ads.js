const { Router } = require('express');
const { createAd, getAds, getLatest, getAd } = require('../controllers/ads-controller');
const multer  = require('multer')();

const router = Router();

router.post('/create', multer.array('photos', 15), createAd);

router.get('/getAll', getAds);

router.get('/getLatest', getLatest);

router.get('/:id', getAd);

module.exports = router;