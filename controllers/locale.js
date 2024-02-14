// general endpoints controllers
const getAllRegions = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    nbHits: 0,
    data: [],
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
