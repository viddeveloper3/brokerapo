const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
    },
    location: {
      type: String,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    brokerName: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    features: {
      type: [String],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
