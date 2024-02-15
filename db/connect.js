const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = (URI) => {
  return mongoose.connect(URI);
};

module.exports = {
  connectDB,
};
