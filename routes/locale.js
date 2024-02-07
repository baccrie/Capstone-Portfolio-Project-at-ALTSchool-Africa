const express = require("express");

const router = express.Router();

const { getAllRegions } = require("../controllers/locale");

router.get("/regions", getAllRegions);

module.exports = router;
