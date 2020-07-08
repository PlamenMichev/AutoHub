const { Router } = require('express');
const fetch = require('node-fetch');
const { fetchMakes, fetchModels } = require('../utils/cron-jobs');

const router = Router();

router.get('/makes/all', async (req, res) => {
  await fetchModels();
});

module.exports = router;