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
router.get('/regions', getAllRegions);
router.get('/states', getAllStates);
router.get('/lgas', getAllLgas);

//specific endpoints
router.get('/:region/lgas', lgasInRegion);
router.get('/:region/:state/lgas', lgasInState);
router.get('/:region/states', checkApiKey, statesInRegion);

// admin endpoints

module.exports = router;
