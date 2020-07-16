const { getAllMakes } = require('../services/makes-service');

const getAllCarMakes = (req, res) => {
    try {
        getAllMakes((makes) => {
            return res
                    .status(200)
                    .json(makes);
        });
    } catch (error) {
        return res
                .status(500)
                .json({
                    message: 'Internal server error!',
                });
    }
};

module.exports = {
    getAllCarMakes,
}