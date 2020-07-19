const { createNewAd } = require('../services/ads-service');

const createAd = async (req, res) => {
    let {
        title,
        make,
        model,
        price,
        fuelType,
        transmission,
        distanceRun,
        manufactureDate,
        horsepower,
        color,
        description,
        type,
        userId,
    } = req.body;

    if (!price) {
        price = 'Negotiable';
    }

    try {
        const createdAd = await createNewAd(title, make, model, price, fuelType, transmission, distanceRun, manufactureDate, horsepower, color, description, 
            type, userId, req.files);
        if (createdAd) {
            res.status(201)
                .json(createdAd);
        } else {
            res.status(400)
                .json({title: 'Invalid data!'});
        }

    } catch (error) {
        res.status(400)
        .json({title: error.message});
    }
}

module.exports = {
    createAd,
}