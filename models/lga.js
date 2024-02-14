const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const lgaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    state: {
      type: Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = model('Lga', lgaSchema);
