const { connectDB } = require('../db/connect');
const Region = require('../models/region');
const State = require('../models/state');
const Lga = require('../models/lga');

const allState = require('../seed/states.json');
require('dotenv').config();

const populateData = async () => {
  try {
    console.log();
    await connectDB(process.env.MONGODB_URI);
    await State.deleteMany();
    await Lga.deleteMany();
    for (const state of allState) {
      const newState = await new State();
      let stateRegion = await Region.find({
        name: { $regex: state.region, $options: 'i' },
      });

      // console.log(stateRegion[0]._id);
      // console.log(state);
      newState.name = state.name;
      newState.capital = state.capital;
      newState.slogan = state.slogan;
      newState.established = state.established;
      newState.area = state.area;
      newState.postal_code = state.postal_code;
      newState.website = state.website;
      newState.coordinate = state.coordinate;
      newState.region = stateRegion[0]._id;
      newState.population = state.population;
      newState.description = state.description;
      newState.ethnic_groups = state.ethnic_groups;
      newState.lgas;
      newState.institutions = state.institutions;

      [];

      for (const lga of state.lgas) {
        const newLga = new Lga();
        newLga.name = lga;
        newLga.state = newState._id;
        newLga.region = stateRegion[0]._id;
        newState.lgas.push(newLga._id);

        await newLga.save();
      }

      stateRegion[0].states.push(newState._id);
      stateRegion[0].save();
      newState.save();

      console.log(newState.name, 'is done....');
    }
    console.log('Done');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateData();
