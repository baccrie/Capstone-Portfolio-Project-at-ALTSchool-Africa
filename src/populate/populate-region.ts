import { connectDB } from '../db/connect';
import Region from '../models/region';
import allRegions from '../seed/region.json';
require('dotenv').config();

const populateRegion = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Region.deleteMany();
    const res = await Region.create(allRegions);
    console.log(`Done...`);
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
};

populateRegion();
