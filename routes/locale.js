const express = require('express');

const router = express.Router();

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
router.get('/search', search);

// general points
router.get('/regions', getAllRegions);
router.get('/states', getAllStates);
router.get('/lgas', getAllLgas);

//specific endpoints
router.get('/:region/lgas', lgasInRegion);
router.get('/:region/:state/lgas', lgasInState);
router.get('/:region/states', statesInRegion);

module.exports = router;
