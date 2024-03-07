// const mongoDB = new MongoMemoryServer();

// /**
//  * Connect to the in-memory database.
//  */

// export const connectToDatabase = async () => {
//   const dBName = 'locale';
//   await mongoDB.start();
//   const uri = mongoDB.getUri();

//   //
//   const mongooseOpts = {
//     dbName: dBName,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//     // Clear the user collection
//   } as mongoose.ConnectOptions;

//   // connect to the db
//   await mongoose.connect(uri, mongooseOpts);

//   // Clear the user collection
//   await mongoose.connection.collection('users').deleteMany({});
// };

import mongoose from 'mongoose';
import { connectDB } from '../db/connect';
import User from '../models/user';

export const connectToDatabase = async () => {
  // conect to the database
  await connectDB(process.env.MONGODB_URI);

  // await create a test user with api key
  await User.create({
    username: 'baccrie',
    email: 'test@test.com',
    password: '3injwed9$ghwjU&buhwbOInq67u92h8',
    api_key: '82hikjenf719&#Y*@!IKN877y',
    is_superUser: true,
  });
};
