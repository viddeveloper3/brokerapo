const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Name is required."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number already exists."],
      minLength: 10,
    },
    wishlist: {
      type: [String],
    },
    property: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
