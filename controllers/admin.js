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
    const newRegionObj = { name, description, major_ethnic_group };
    const newRegion = await Region.create(newRegionObj);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: newRegion,
    });
  } catch (err) {
    next(new Error('create region failed!'));
  }
};

// update region
const updateRegion = async (req, res, next) => {
  try {
    let { name, description, major_ethnic_group } = req.body;
    let { region } = req.params;

    name = capitalize(name);
    region = capitalize(region);

    const newRegionObj = { name, description, major_ethnic_group };
    const updatedRegion = await Region.findOneAndUpdate(
      { name: region },
      newRegionObj,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedRegion) {
      throw new BadRequestError(
        'The region you re trying to update dosent exist!'
      );
    }

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
    let { state, region } = req.params;
    region = capitalize(region);

    const regionToAddState = await Region.findOne({ name: region });
    if (!regionToAddState) {
      throw new BadRequestError(
        'the region in which you re trying to add a state is invalid...'
      );
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
      name,
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
    console.log(err);
    next(err);
  }
};

const updateState = async (req, res, next) => {
  try {
    //let { name, } = req.body;
    let { region, state } = req.params;

    state = capitalize(state);
    region = capitalize(region);

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

    if (!stateToUpdate) {
      throw new BadRequestError('State dosent exist in region!!!');
    }

    //Update Lga and save
    const data = await State.findByIdAndUpdate(stateToUpdate._id, req.body, {
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

//Lgas

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
    const regionToAddLga = await Region.findOne({
      name: region,
    });

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
