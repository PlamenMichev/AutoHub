const { Router } = require('express');
const fetch = require('node-fetch');
const { fetchMakes } = require('../utils/cron-jobs');

const router = Router();

router.get('/makes/all', async (req, res) => {
  await fetchMakes();
});

module.exports = router;