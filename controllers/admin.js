const { capitalize } = require('../utils/capitalize-first-letter');
const Region = require('../models/region');
const State = require('../models/state');
const Lga = require('../models/lga');

const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');

// Region

// create region
const createRegion = async (req, res, next) => {
  try {
    let { name, description, major_ethnic_group } = req.body;

    name = capitalize(name);

    // check if region exists
    const check = await Region.findOne({ name });
    if (check) {
      throw new BadRequestError('Region with name already exists...');
    }

    // else continue
    const newRegionObj = { name, description, major_ethnic_group };
    const newRegion = await Region.create(newRegionObj);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: newRegion,
    });
  } catch (err) {
    //console.log(err);
    next(err);
  }
};

// update region
const updateRegion = async (req, res, next) => {
  try {
    let { name, description, major_ethnic_group } = req.body;
    let { region } = req.params;

    name = capitalize(name);
    region = capitalize(region);
    console.log(req.params);
    const newRegionObj = { name, description, major_ethnic_group };

    // check if region exists
    const check = await Region.findOne({
      name: region,
    });
    console.log(check);
    if (!check) {
      throw new BadRequestError(
        'The region you re trying to update dosent exist!'
      );
    }

    // Update Region
    const updatedRegion = await Region.findOneAndUpdate(
      { name: region },
      newRegionObj,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: updatedRegion,
    });
  } catch (err) {
    next(err);
  }
};

// delete region
const deleteRegion = async (req, res, next) => {
  try {
    let { region } = req.params;

    region = capitalize(region);
    const regionToDelete = await Region.find({
      name: region,
    });

    if (!regionToDelete || regionToDelete.length < 1) {
      throw new BadRequestError(
        'The region you re trying to delete dosent exist!'
      );
    }

    //delete all lgas in region
    const reslt = await Lga.deleteMany({
      region: regionToDelete[0]._id,
    });
    //console.log(reslt);
    // delete all states in region
    await State.deleteMany({
      region: regionToDelete[0]._id,
    });

    // delete Region itself
    await Region.deleteOne({
      name: region,
    });

    res.status(200).json({
      status: 'success',
      msg: 'Region successfully deleted',
    });
  } catch (err) {
    next(err);
  }
};

// State
const createState = async (req, res, next) => {
  try {
    let { region } = req.params;
    region = capitalize(region);

    const regionToAddState = await Region.findOne({ name: region });
    if (!regionToAddState) {
      throw new BadRequestError(
        'the region in which you re trying to add a state is invalid...'
      );
    }

    // check if state exists
    const check = await State.findOne({
      name: capitalize(req.body.name),
    });

    console.log(check, capitalize(req.body.name));
    if (check) {
      throw new BadRequestError('State with name already exists');
    }
    const {
      name,
      capital,
      slogan,
      established,
      area,
      ethnic_groups,
      population,
      postal_code,
      website,
      coordinate,
      description,
      lgas,
      institutions,
    } = req.body;

    const queryObj = {
      name: capitalize(name),
      capital,
      slogan,
      established,
      region: regionToAddState._id,
      area,
      ethnic_groups,
      population,
      postal_code,
      website,
      coordinate,
      description,
      lgas: [],
      institutions,
    };

    const newState = await State.create(queryObj);
    regionToAddState.states.push(newState._id);
    await regionToAddState.save();

    res.status(200).json({
      status: 'success',
      data: newState,
    });
  } catch (err) {
    next(err);
  }
};

const updateState = async (req, res, next) => {
  try {
    console.log('yes');
    //let { name, } = req.body;
    let { region, state } = req.params;

    state = capitalize(state);
    region = capitalize(region);
    req.body.name = capitalize(req.body.name);

    const queryObj = {
      name: req.body.name,
      capital: req.body.capital,
      slogan: req.body.slogan,
      established: req.body.established,
      area: req.body.area,
      ethnic_groups: req.body.ethnic_groups,
      postal_code: req.body.postal_code,
      website: req.body.website,
      coordinate: req.body.coordinate,
      population: req.body.population,
      description: req.body.description,
      institutions: req.body.institutions,
    };
    console.log(state);
    // check region validity
    const regionToUpdateState = await Region.findOne({
      name: region,
    });

    if (!regionToUpdateState) {
      throw new BadRequestError(
        'The region from which you re trying to update a state dosent exists!!!'
      );
    }

    // check state vallidity
    const stateToUpdate = await State.findOne({
      name: state,
      region: regionToUpdateState._id,
    });

    console.log(queryObj.name === stateToUpdate.name);

    if (!stateToUpdate) {
      throw new BadRequestError('State dosent exist in region!!!');
    } else if (stateToUpdate && queryObj.name !== stateToUpdate.name) {
      throw new BadRequestError(
        'the name provided in the request body belongs to another state, pls choose another name'
      );
    }

    //Update Lga and save
    const data = await State.findByIdAndUpdate(stateToUpdate._id, queryObj, {
      runValidators: true,
      new: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        ...data._doc,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteState = async (req, res, next) => {
  try {
    let { region, state } = req.params;
    state = capitalize(state);
    region = capitalize(region);

    // check region validity
    const regionToDeleteState = await Region.findOne({
      name: region,
    });

    if (!regionToDeleteState) {
      throw new BadRequestError(
        'The region from which you re trying to delete a state dosent exists!!!'
      );
    }

    // check state vallidity
    const stateToDelete = await State.findOne({
      name: state,
      region: regionToDeleteState._id,
    });

    if (!stateToDelete) {
      throw new BadRequestError('State dosent exist in region!!!');
    }

    // Delete state, delete state from region , delete all lgas with state
    const index = regionToDeleteState.states.findIndex(
      (el) => el === stateToDelete._id
    );

    if (index > -1) {
      regionToDeleteState.states.splice(index, 1);
    }
    await regionToDeleteState.save();

    await Lga.deleteMany({
      state: stateToDelete._id,
    });

    await State.findOneAndDelete({
      _id: stateToDelete._id,
    });

    res.status(201).json({
      status: 'success',
      data: stateToDelete,
    });
  } catch (err) {
    next(err);
  }
};

// Lgas

// create lga
const createLga = async (req, res, next) => {
  try {
    let { state } = req.params;
    let { name, region } = req.body;

    state = capitalize(state);
    region = capitalize(region);

    const stateToAddLga = await State.findOne({
      name: state,
    });

    if (!stateToAddLga) {
      throw new BadRequestError(
        'the state you re trying to create a lga for dosent exists..'
      );
    }

    const regionToAddLga = await Region.findOne({
      name: region,
    });

    if (!regionToAddLga) {
      throw new BadRequestError('Oops region is invalid!!');
    }

    // check if lga exists under state and region
    const check = await Lga.findOne({
      region: regionToAddLga._id,
      state: stateToAddLga._id,
    });
    if (check) {
      throw new BadRequestError('Lga already exists in state and region!!!');
    }

    const lga = await Lga.create({
      name,
      state: stateToAddLga._id,
      region: regionToAddLga._id,
    });

    // Add Lga to State
    stateToAddLga.lgas.push(lga._id);
    await stateToAddLga.save();

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: lga,
    });
  } catch (err) {
    next(err);
  }
};

// update lga
const updateLga = async (req, res, next) => {
  try {
    let { name } = req.body;
    let { state, lga } = req.params;

    state = capitalize(state);

    // check state validity
    const stateToAddLga = await State.findOne({
      name: state,
    });

    if (!stateToAddLga) {
      throw new BadRequestError(
        'The state from which you re trying to update a lga dosent exists!!!'
      );
    }

    // check lga vallidity
    const lgaToUpdate = await Lga.findOne({
      name: lga,
      state: stateToAddLga._id,
    });

    if (!lgaToUpdate) {
      throw new BadRequestError('Lga dosent exist in state!!!');
    }

    //Update Lga and save
    lgaToUpdate.name = name;
    lgaToUpdate.save();

    res.status(201).json({
      status: 'success',
      data: {
        lgaToUpdate,
      },
    });
  } catch (err) {
    //console.log(err);
    next(err);
  }
};

// delete lga
const deleteLga = async (req, res, next) => {
  try {
    let { state, lga } = req.params;
    state = capitalize(state);

    // check state validity
    const stateToDeleteLga = await State.findOne({
      name: state,
    });

    if (!stateToDeleteLga) {
      throw new BadRequestError(
        'The state from which you re trying to delete a lga dosent exists!!!'
      );
    }

    // check lga vallidity
    const lgaToDelete = await Lga.findOne({
      name: lga,
      state: stateToDeleteLga._id,
    });

    if (!lgaToDelete) {
      throw new BadRequestError('Lga dosent exist in state!!!');
    }

    // Delete lga and also delete from state
    const index = stateToDeleteLga.lgas.findIndex(
      (el) => el === lgaToDelete._id
    );

    if (index > -1) {
      stateToDeleteLga.lgas.splice(index, 1);
    }
    await stateToDeleteLga.save();

    await Lga.findOneAndDelete({
      _id: lgaToDelete._id,
    });

    res.status(201).json({
      status: 'success',
      data: lgaToDelete,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRegion,
  updateRegion,
  deleteRegion,
  createState,
  updateState,
  deleteState,
  createLga,
  updateLga,
  deleteLga,
};
