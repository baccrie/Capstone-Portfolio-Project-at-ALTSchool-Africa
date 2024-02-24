import express from 'express';
import checkApiKey from '../middleware/check-api-key';

const router = express.Router();

import {
  getAllRegions,
  getAllStates,
  getAllLgas,
  lgasInRegion,
  lgasInState,
  search,
  statesInRegion,
} from '../controllers/locale';

// search endpoints
router.get('/search', search);

// general endpoints
router.get('/regions', getAllRegions);
router.get('/states', getAllStates);
router.get('/lgas', getAllLgas);

//specific endpoints
router.get('/:region/lgas', lgasInRegion);
router.get('/:region/:state/lgas', lgasInState);
router.get('/:region/states', statesInRegion);

// admin endpoints

export default router;
