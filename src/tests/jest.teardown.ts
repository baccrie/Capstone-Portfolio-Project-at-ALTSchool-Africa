/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

// const mongoDB = new MongoMemoryServer();

// /**
//  * Drop database, close the connection and stop mongod.
//  */
// export default async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoDB.stop();
// };

import mongoose from 'mongoose';
import { connectDB } from '../db/connect';
import User from '../models/user';
import Region from '../models/region';
import State from '../models/state';
import Lga from '../models/lga';
import { lgasInState } from '../controllers/locale';

/*
    Drop Dabatabase and close connection    
*/

export default async () => {
  await User.deleteOne({
    _id: '65db4c5428e883e3affcc6c8',
    username: 'baccrie',
    email: 'test@test.com',
    password: '3injwed9$ghwjU&buhwbOInq67u92h8',
    api_key: '82hikjenf719&#Y*@!IKN877y',
  });

  await Region.deleteOne({
    name: 'Tested-Region',
  });

  await State.deleteOne({
    name: 'Driftmark',
  });

  await Lga.deleteOne({
    name: 'Storms-End',
  });

  await mongoose.connection.close();
};
