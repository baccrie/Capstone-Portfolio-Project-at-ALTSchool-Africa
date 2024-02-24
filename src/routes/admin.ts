import express from 'express';
import {
  createRegion,
  updateRegion,
  deleteRegion,
  createState,
  updateState,
  deleteState,
  createLga,
  updateLga,
  deleteLga,
} from '../controllers/admin';

const router = express.Router();

// Region
router.post('/region', createRegion);
router.patch('/update/region/:region', updateRegion);
router.delete('/delete/region/:region/', deleteRegion);

// State
router.post('/:region/state', createState);
router.patch('/update/state/:region/:state', updateState);
router.delete('/delete/state/:region/:state', deleteState);

//Lga
router.post('/:state/lga', createLga);
router.patch('/update/lga/:state/:lga', updateLga);
router.delete('/delete/lga/:state/:lga', deleteLga);

export default router;
