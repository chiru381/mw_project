const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const config = require("config");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    user_id: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },
    phone_number: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    otp: {
      type: String,
    },
    isAdmin: Boolean,
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
