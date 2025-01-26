const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    timeToDelivery: {
      type: Number, // in minutes
      required: true,
    },
    availableCount: {
      type: Number,
      required: true,
      min: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);
