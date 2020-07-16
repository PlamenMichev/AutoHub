const { Router } = require('express');
const { getAllCarMakes } = require('../controllers/makes-controller');

const router = Router();

router.get('/all', getAllCarMakes);

module.exports = router;