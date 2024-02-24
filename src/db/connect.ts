import mongoose from 'mongoose';
require('dotenv').config();

export function connectDB(URI: any) {
  return mongoose.connect(URI);
}

module.exports = {
  connectDB,
};
