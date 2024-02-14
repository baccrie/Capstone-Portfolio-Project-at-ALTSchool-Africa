// general endpoints controllers
const getAllRegions = async (req, res, next) => {
  res.status(200).json({
    message:
      'get all regions endpoint successful...',
  });
};

const getAllStates = async (req, res, next) => {
  res.status(200).json({
    message:
      'get all states endpoint successful...',
  });
};

const getAllLgas = async (req, res, next) => {
  res.status(200).json({
    message:
      'get all lgas endpoint successful...',
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
};
module.exports = {
  getAllRegions,
  getAllStates,
  getAllLgas,
  search,
  lgasInRegion,
  lgasInState,
  statesInRegion,
};
