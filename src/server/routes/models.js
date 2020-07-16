const { Router } = require('express');
const { getModelsForMake } = require('../controllers/models-controller');

const router = Router();

// To get models for a make put ?make={make}
router.get('', getModelsForMake);

module.exports = router;