const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const stateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    capital: {
      type: String,
      required: true,
    },

    slogan: {
      type: String,
      required: true,
    },

    established: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    ethnic_groups: [
      {
        type: String,
      },
    ],

    population: {
      total: String,
      estimate: String,
      Density: String,
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: [true, 'must be present'],
    },

    postal_code: {
      type: String,
      required: true,
    },

    website: {
      type: String,
      required: true,
    },

    coordinate: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    lgas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lga',
        required: [true],
      },
    ],
  },

  { timestamps: false }
);

module.exports = model('State', stateSchema);
