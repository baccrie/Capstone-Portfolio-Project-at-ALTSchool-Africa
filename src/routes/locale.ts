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

import { getAllR, getAllS, getAllL } from '../middleware/cache';

// search endpoints
router.get('/search', search);

// general endpoints
router.get('/regions', getAllR, getAllRegions);
router.get('/states', getAllS, getAllStates);
router.get('/lgas', getAllL, getAllLgas);

//specific endpoints
router.get('/:region/lgas', lgasInRegion);
router.get('/:region/:state/lgas', lgasInState);
router.get('/:region/states', statesInRegion);

// admin endpoints

export default router;
