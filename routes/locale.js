const express = require('express');

const router = express.Router();

const {
  getAllRegions,
} = require('../controllers/locale');

router.get('/');
router.get('/regions', getAllRegions);
router.get('/states');
router.get('/lgas');

module.exports = router;
