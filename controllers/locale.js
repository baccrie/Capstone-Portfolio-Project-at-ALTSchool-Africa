const Region = require('../models/region');
const Lga = require('../models/lga');
const State = require('../models/state');

// errors
const BadRequestError = require('../errors/bad-request');

// general endpoints controllers
const getAllRegions = async (req, res, next) => {
  const data = await Region.find({}).populate('states', 'name');
  res.status(200).json({
    status: 'success',
    nbHits: data.length,
    data: data,
  });
};

const getAllStates = async (req, res, next) => {
  const data = await State.find()
    .populate('region', 'name')
    .populate('lgas', 'name');
  res.status(200).json({
    status: 'success',
    nbHits: data.length,
    data,
  });
};

const getAllLgas = async (req, res, next) => {
  const data = await Lga.find()
    .populate('region', 'name')
    .populate('state', 'name');
  res.status(200).json({
    status: 'success',
    nbHits: data.length,
    data: data,
  });
};

// search endpoint
const search = async (req, res, next) => {
  const { region, state, lga } = req.query;
  let data = {};

  try {
    if (region) {
      if (!state && !lga) {
        data = await Region.findOne({
          name: { $regex: region, $options: 'i' },
        }).populate('states');

        if (!data) {
          throw new BadRequestError('Region does not exist....');
        }
      }
    }

    if (state) {
      if (region) {
        console.log('inside.......');
        const getRegion = await Region.findOne({
          name: { $regex: region, $options: 'i' },
        });

        // if region dosent exists
        if (!getRegion) {
          throw new BadRequestError('Region dosent exist...');
        }
        // if region exists
        else {
          data = await State.findOne({
            name: { $regex: state, $options: 'i' },
          }).populate('lgas', 'name');

          // check if state exists for the provided region
          if (!data) {
            throw new BadRequestError('State not found for the region...');
          }
        }
      } else if (!region) {
        console.log('inside...');
        data = await State.findOne({
          name: { $regex: state, $options: 'i' },
        }).populate('lgas');

        // check if state exists
        if (!data || data.length < 1) {
          throw new BadRequestError('Invalid state provided...');
        }
      }
    }

    if (lga) {
      if (state && region) {
        const getRegion = await Region.findOne({
          name: { $regex: region, $options: 'i' },
        });

        if (!getRegion) {
          throw BadRequestError('Invalid Region...');
        }

        if (getRegion) {
          const getState = await State.findOne({
            region: { $regex: region, $options: 'i' },
          });

          if (!getState) {
            throw new BadRequestError('State Dosent exist for the region....');
          }

          data = await Lga.findOne({
            name: { $regex: lga, $options: 'i' },
          });

          if (!data) {
            throw new BadRequestError(
              'Lga Dosent exist for the proovided state and region.'
            );
          }
        }
      }

      if (state) {
        const getState = await State.findOne({
          name: { $regex: state, $options: 'i' },
        });

        if (!getState) {
          throw BadRequestError('Inavlid State ...');
        }

        const data = await Lga.findOne({
          name: { $regex: lga, $options: 'i' },
        });
        // some code
      }
      if (region) {
        const getRegion = await Region.findOne({
          name: { $regex: region, $options: 'i' },
        });

        if (!getRegion) {
          throw BadRequestError('Invalid Region...');
        }

        const data = await Lga.findOne({
          name: { $regex: lga, $options: 'i' },
        });
        // some code
      }
      // some code
    }

    res.status(200).json({
      ...data._doc,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// specific endpoints controllers
const lgasInRegion = async (req, res, next) => {
  const { region } = req.params;
  const getRegion = await Region.findOne({
    name: { $regex: region, $options: 'i' },
  });

  if (!getRegion) {
    // throw error
    return console.log('there is an error....');
  }

  const data = await Lga.find({
    region: getRegion._id,
  }).populate('state', 'name');
  res.status(200).json({
    status: 'success',
    nbHits: data.length,
    data,
  });
};

const lgasInState = async (req, res, next) => {
  const { state, region } = req.params;

  // (if state is notin region) {
  // // do this
  // }

  const getState = await State.findOne({
    name: { $regex: state, $options: 'i' },
  });

  console.log(getState._id);
  const data = await Lga.find({
    state: getState._id,
  });

  console.log(data);
  res.status(200).json({
    status: 'success',
    nbHits: data.length,
    data,
  });
};

const statesInRegion = async (req, res, next) => {
  const { region } = req.params;

  const getRegion = await Region.findOne({
    name: { $regex: region, $options: 'i' },
  });

  const data = await State.find({
    region: getRegion._id,
  }).populate('lgas', 'name');
  res.status(200).json({
    status: 'success',
    nbHits: data.length,
    data,
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
