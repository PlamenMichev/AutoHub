const { Router } = require('express');
const fetch = require('node-fetch');

const router = Router();

router.get('/makes/all', async (req, res) => {
    const where = encodeURIComponent(JSON.stringify({
        "Make": {
          "$exists": true
        }
      }));
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=250&order=Make&keys=Make&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id': process.env.CarAppId,
            'X-Parse-REST-API-Key': process.env.CarAppKey,
          }
        }
      );
      const data = await response.json();

      res
        .status(200)
        .json(data);
});

module.exports = router;