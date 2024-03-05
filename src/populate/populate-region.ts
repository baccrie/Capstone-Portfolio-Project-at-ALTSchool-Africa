import { connectDB } from '../db/connect';
import Region from '../models/region';
import allRegions from '../seed/region.json';
import { trim, capitalize } from '../utils/capitalize-first-letter';

require('dotenv').config();

export async function populateRegion() {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Region.deleteMany();
    const res = await Region.create(allRegions);
    console.log(`Done...`);
    process.exit();
  } catch (err) {
    process.exit(1);
  }
}

populateRegion();
