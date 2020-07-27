const { uploadImage } = require('../utils/cloudinary');
const Ad = require('../models/ad');

const createNewAd = async (title, make, model, price, fuelType, transmission, distanceRun, manufactureDate, horsepower, color, description, 
    type, adPlacer, photos) => {

    const photosUrls = await Promise.all(photos.map(async (p) => await uploadImage(p)));

    const currentDate = new Date();
    const ad = await new Ad({ title, make, model, price, fuelType, transmission, distanceRun, manufactureDate, horsepower, color, description, 
        type, createdOn: currentDate, adPlacer, photosUrls}).save();

    return ad;
}

const getAllAds = async () => {
    const ads = await Ad.find();
    
    return ads;
}

const getLatestAds = async () => {
    const ads = await Ad.find()
        .sort({ createdOn: -1 })
        .limit(3);

    return ads;
}


module.exports = {
    createNewAd,
    getAllAds,
    getLatestAds,
}