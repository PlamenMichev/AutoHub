const fetch = require('node-fetch');
const fs = require('fs');

const fetchMakes = async () => {
    const headers = {
        'X-Parse-Application-Id': process.env.CarAppId,
        'X-Parse-REST-API-Key': process.env.CarAppKey,
      }
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?count=1&limit=0`,
        {
            headers
        }
      );
      const data = await response.json();   
      const count = data.count;

      const responseForMakes = await fetch(
        `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=${count}&keys=Make`,
        {
            headers
        }
      );
      const makesResult = await responseForMakes.json();
      const result = [...new Set(makesResult.results.map(m => m.Make))];

      result.sort((a, b) => {
        return a.localeCompare(b);
      });

      return fs.writeFile('./data/makes.json', JSON.stringify(result), (err) => {
         if (err) {
            console.log(err);
         }
      });
}

const fetchModels = async () => {
  const headers = {
      'X-Parse-Application-Id': process.env.CarAppId,
      'X-Parse-REST-API-Key': process.env.CarAppKey,
    }

    const response = await fetch(
      `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?count=1&limit=0`,
      {
          headers
      }
    );
    const data = await response.json();   
    const count = data.count;

    const makesModelsResponse = await fetch(
      `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=${count}&keys=Make,Model`,
      {
        headers
      }
    );
    const makesAndModels = await makesModelsResponse.json();
      console.log(makesAndModels)
    fs.readFile('./data/makes.json', 'utf-8', (err, data) => {
      const makes = JSON.parse(data);
      const result = [];
      for (const make of makes) {
        const allModels = makesAndModels.results.filter(x => x.Make == make);
        const uniqueModels = [...new Set(allModels.map(m => m.Model))];
        uniqueModels.sort((a, b) => {
          return a.localeCompare(b);
        });
        
        const currentResult = {};
        currentResult[make] = uniqueModels;
        result.push(currentResult);
      }

      return fs.writeFile('./data/models.json', JSON.stringify(result), (err) => {
        if (err) {
           console.log(err);
        }
     });
    });

}

module.exports = {
    fetchMakes,
    fetchModels,
}