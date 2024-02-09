const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const regionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    states: [
      {
        type: Schema.Types.ObjectId,
        ref: "State",
      },
    ],

    description: {
      type: String,
      required: true,
    },

    tribes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: false }
);

module.exports = model("Region", regionSchema);