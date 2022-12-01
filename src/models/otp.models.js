const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// const config = require("config");

const otpSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

// otpSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
