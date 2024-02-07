const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

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

    Region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
      required: [true, "must be present"],
    },

    lgas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lga",
        required: [true],
      },
    ],

    slogan: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = model("State", stateSchema);
