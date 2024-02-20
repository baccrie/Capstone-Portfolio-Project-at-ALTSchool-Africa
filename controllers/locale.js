const Region = require('../models/region');
const Lga = require('../models/lga');
const State = require('../models/state');
const { capitalize } = require('../utils/capitalize-first-letter');

// errors
const BadRequestError = require('../errors/bad-request');

// general endpoints controllers
const getAllRegions = async (req, res, next) => {
  try {
    const data = await Region.find().populate(
      'states',
      '-_id name capital slogan'
    );

    res.status(200).json({
      status: 'success',
      nbHits: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStates = async (req, res, next) => {
  let { limit, page } = req.query;
  try {
    const totalNo = await State.find().count();
    let states = State.find()
      .populate('region', '-_id name')
      .populate('lgas', '-_id name');

    // check if client is willing to paginate
    if (limit || page) {
      limit = Number(limit) || 6;
      page = Number(page) || 1;

      const skip = (page - 1) * limit;
      states = states.skip(skip).limit(limit);
    }

    const noOfPages = Math.ceil(totalNo / limit) || 1;
    const data = await states;

    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query.');
    }

    res.status(200).json({
      status: 'success',
      nbHits: data.length,
      noOfPages,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllLgas = async (req, res, next) => {
  let { limit, page } = req.query;

  try {
    const totalNo = await Lga.find().count();
    let lgas = Lga.find()
      .populate('region', '-_id name')
      .populate('state', '-_id name');

    // check if clients is willing to paginate
    if (limit || page) {
      limit = Number(limit) || 50;
      page = Number(page) || 1;

      const skip = (page - 1) * limit;
      lgas = lgas.skip(skip).limit(limit);
    }

    const noOfPages = Math.ceil(totalNo / limit) || 1;
    const data = await lgas;

    // ckeck for empty result set
    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query provided...');
    }

    res.status(200).json({
      status: 'success',
      nbHits: data.length,
      noOfPages,
      data: data,
    });
  } catch (error) {
    next(error);
  }
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
    next(err);
  }
};

// specific endpoints controllers
const lgasInRegion = async (req, res, next) => {
  // validate with joi

  let { limit, page } = req.query;
  let { region } = req.params;
  try {
    region = capitalize(region);
    const getRegion = await Region.findOne({
      name: region,
    });

    if (!getRegion) {
      throw new BadRequestError('The region is invalid....');
    }

    const totalNo = await Lga.find({
      region: getRegion._id,
    }).count();
    let lga = Lga.find({
      region: getRegion._id,
    })
      .select('name state')
      .populate('state', 'name capital');

    // ckeck if client is willing to paginate
    if (limit || page) {
      limit = Number(limit) || 20;
      page = Number(page) || 1;

      const skip = (page - 1) * limit;
      lga = lga.skip(skip).limit(limit);
    }

    const noOfPages = Math.ceil(totalNo / limit) || 1;
    const data = await lga;

    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query.');
    }

    res.status(200).json({
      status: 'success',
      nbHits: data.length,
      noOfPages,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const lgasInState = async (req, res, next) => {
  let { state, region } = req.params;
  let { limit, page } = req.query;

  try {
    state = capitalize(state);
    region = capitalize(region);

    const getRegion = await Region.findOne({
      name: region,
    });
    const getState = await State.findOne({
      name: state,
    }).populate('region', 'name');

    // check region existence
    if (!getRegion) {
      throw new BadRequestError('The region is invalid...');
    }

    // check state existence
    if (!getState) {
      throw new BadRequestError('The state is invalid...');
    }

    console.log(getState.region.name, getRegion.name);
    // check existence of state in region
    if (!(getState.region.name === getRegion.name)) {
      throw new BadRequestError(
        'The state dosent exist for the particular region...'
      );
    }

    const totalNo = await Lga.find({
      state: getState._id,
      region: getRegion._id,
    }).count();

    let lga = Lga.find({
      state: getState._id,
      region: getRegion._id,
    }).select('name');

    // ckeck if client is willing to paginate
    if (limit || page) {
      limit = Number(limit) || 5;
      page = Number(page) || 1;

      const skip = (page - 1) * limit;
      lga = lga.skip(skip).limit(limit);
    }

    const data = await lga;
    const noOfPages = Math.ceil(totalNo / limit) || 1;

    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query.');
    }

    res.status(200).json({
      status: 'success',
      nbHits: data.length,
      noOfPages,
      data,
    });
  } catch (err) {
    next(err);
  }
};

const statesInRegion = async (req, res, next) => {
  let { region } = req.params;
  try {
    region = capitalize(region);
    const getRegion = await Region.findOne({
      name: region,
    });

    if (!getRegion) {
      throw new BadRequestError('The region is invalid....');
    }

    const data = await State.find({
      region: getRegion._id,
    }).populate('lgas', 'name');

    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query.');
    }

    res.status(200).json({
      status: 'success',
      nbHits: data.length,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
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
