const fs = require('fs');

const getModelsForMake = (make, callback) => {
    fs.readFile('./data/models.json', 'utf-8', (err, data) => {
        const models = JSON.parse(data);
        let extractedModels;
        for (const obj of models) {
            if (obj[make]) {
                extractedModels = obj[make];
                break;
            }
        }
        return callback(extractedModels);
    });
};

module.exports = {
    getModelsForMake,
}