const fs = require('fs');

const getAllMakes = (callback) => {
    fs.readFile('./data/makes.json', 'utf-8', (err, data) => {
        const makes = JSON.parse(data);
        return callback(makes);
    });
};

module.exports = {
    getAllMakes,
}