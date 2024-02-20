const express = require('express');
const {
  createRegion,
  updateRegion,
  deleteRegion,
  createState,
  updateState,
  deleteState,
  createLga,
  updateLga,
  deleteLga,
} = require('../controllers/admin');

const router = express.Router();

// Region
router.post('/region', createRegion);
router.patch('/:region', updateRegion);
router.delete('/region/:region', deleteRegion);

// State
router.post('/:region/state', createState);
router.patch('/:region/:state', updateState);
router.delete('/:region/:state', deleteState);

//Lga
router.post('/:state/lga', createLga);
router.patch('/:state/:lga', updateLga);
router.delete('/:state/:lga', deleteLga);

module.exports = router;
