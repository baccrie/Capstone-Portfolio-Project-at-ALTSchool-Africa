const { connectDB } = require('../db/connect');
const Region = require('../models/region');
const State = require('../models/state');
const Lga = require('../models/lga');

const allState = require('../seed/states.json');
require('dotenv').config();

// not ready for this
const populateData = async () => {
  await connectDB(process.env.MONGODB_URI);
  // const res = await State.find({
  //   name: { $regex: 'bornO', $options: 'i' },
  // }).populate('lgas');
  // console.log(res);

  const data = await State.findOne({
    name: 'Lagos',
  });

  console.log(data);
};

populateData();
