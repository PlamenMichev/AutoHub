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

      fs.writeFile('./data/makes.json', JSON.stringify(result), (err) => {
         if (err) {
            console.log(err);
         }
      });
}

module.exports = {
    fetchMakes,
}