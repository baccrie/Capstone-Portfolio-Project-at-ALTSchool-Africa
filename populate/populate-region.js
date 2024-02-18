const { connectDB } = require('../db/connect');
const Region = require('../models/region');
const allRegions = require('../seed/region.json');
require('dotenv').config();

//
const data = JSON.stringify(allRegions);
console.log(typeof allRegions);
console.log(typeof data);

console.log();
const populateRegion = async () => {
  try {
    await connectDB('process.env.MONGODB_URI');
    await Region.deleteMany();
    const res = await Region.create(allRegions);
    console.log(res);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

populateRegion();
