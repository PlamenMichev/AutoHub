const { uploadImage } = require('../utils/cloudinary');
const Ad = require('../models/ad');

const createNewAd = async (title, make, model, price, fuelType, transmission, distanceRun, manufactureDate, horsepower, color, description, 
    type, adPlacer, photos) => {
    
    const photosUrls = [];
    for (const photo of photos) {
        const photoUrl = await uploadImage(photo);
        photosUrls.push(photoUrl);
    }

    const currentDate = new Date();
    const ad = await new Ad({ title, make, model, price, fuelType, transmission, distanceRun, manufactureDate, horsepower, color, description, 
        type, createdOn: currentDate, adPlacer, photosUrls}).save();

    return ad;
}

module.exports = {
    createNewAd,
}