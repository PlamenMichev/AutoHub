const { Router } = require('express');
const { getAllMakes } = require('../controllers/makes-controller');

const router = Router();

router.get('/all', (req, res) => {
    getAllMakes((makes) => {
        return res
                .status(200)
                .json(makes);
    });
});

module.exports = router;