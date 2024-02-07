const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const stateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = model("State", stateSchema);
