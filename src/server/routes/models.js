const { Router } = require('express');
const { getModelsForMake } = require('../controllers/models-controller');

const router = Router();

// To get models for a make put ?make={make}
router.get('', (req, res) => {
    const wantedMake = req.query.make;
    getModelsForMake(wantedMake, (models) => {
        if (!models) {
            return res
                    .status(404)
                    .json({
                        message: 'Invalid car make!',
                    });
        }

        return res
                .status(200)
                .json(models);
    });
})

module.exports = router;