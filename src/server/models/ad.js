const mongooose = require('mongoose');

const adSchema = new mongooose.Schema({
    title: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    fuelType: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    distanceRun: {
        type: Number,
        required: false,
    },
    manufactureDate: {
        type: Date,
        required: true,
    },
    horsepower: {
        type: Number,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    photosUrls: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    adPlacer: {
        type: 'ObjectId',
        ref: 'User',
    }
});

module.exports = mongooose.model('Ad', adSchema);