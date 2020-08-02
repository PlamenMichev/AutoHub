const { Router } = require('express');
const { getSearch } = require('../controllers/search-controller');

const router = Router();

// Add search terms as a query params
// minYear, maxYear - for manufacture year range
// minPower, maxPower
// minPrice, maxPrice 
router.get('', getSearch);

module.exports = router;