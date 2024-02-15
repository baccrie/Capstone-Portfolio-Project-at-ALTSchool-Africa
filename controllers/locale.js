const Region = require('../models/region');
const Lga = require('../models/lga');

// general endpoints controllers
const getAllRegions = async (req, res, next) => {
  // const data = await Region.find({
  //   name: { $regex: 'north-West', $options: 'i' },
  // });

  const data = await Lga.find().populate('region');
  res.status(200).json({
    status: 'success',
    nbHits: data.length,
    data: data,
  });
};

const getAllStates = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    nbHits: 0,
    data: [],
  });
};

const getAllLgas = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    nbHits: 0,
    data: [],
  });
};

// search endpoint
const search = async (req, res, next) => {
  res.status(200).json({
    message: 'seacrh endpoint successful...',
  });
};

// specific endpoints controllers
const lgasInRegion = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    nbHits: 0,
    data: [],
  });
};

const lgasInState = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    nbHits: 0,
    data: [],
  });
};

const statesInRegion = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    nbHits: 0,
    data: [],
  });
};

// exporting for use
module.exports = {
  getAllRegions,
  getAllStates,
  getAllLgas,
  search,
  lgasInRegion,
  lgasInState,
  statesInRegion,
};
