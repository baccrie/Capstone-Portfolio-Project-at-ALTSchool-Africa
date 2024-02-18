const express = require('express');

const router = express.Router();

const checkApiKey = require('../middleware/check-api-key');

const {
  getAllRegions,
  getAllStates,
  getAllLgas,
  search,
  lgasInRegion,
  lgasInState,
  statesInRegion,
} = require('../controllers/locale');

// search endpoints
router.get('/search', checkApiKey, search);

// general endpoints
router.get('/regions', checkApiKey, getAllRegions);
router.get('/states', checkApiKey, getAllStates);
router.get('/lgas', checkApiKey, getAllLgas);

//specific endpoints
router.get('/:region/lgas', checkApiKey, lgasInRegion);
router.get('/:region/:state/lgas', checkApiKey, lgasInState);
router.get('/:region/states', checkApiKey, statesInRegion);

// admin endpoints

module.exports = router;
