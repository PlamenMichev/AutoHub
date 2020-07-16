const { getAllModelsForMake } = require('../services/models-service');

const getModelsForMake = (req, res) => {
    const make = req.query.make;
    getAllModelsForMake(make, (models) => {
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
};

module.exports = {
    getModelsForMake,
}