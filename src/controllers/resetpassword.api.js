const { User } = require("../models/user.models");
const Otp = require("../models/otp.models");
const { validate } = require("../validators/resetpassword.validation");
const dateTime = require("node-datetime");

const resetPassword = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let oldOtp = await Otp.findOne(
    { user_id: req.body.user_id } && { otp: req.body.otp }
  );
  if (!oldOtp)
    return res
      .status(400)
      .json({ responseCode: 400, errorMessage: "user not found" });

  // using date expiry of token
  let dt = dateTime.create();
  let present_dateTime = dt.format("Y-m-d H:M:S");
  let db_dateTime = await Otp.findOne({ otp: req.body.otp });

  let createdDate = db_dateTime.createdAt;
  console.log(createdDate, db_dateTime);
  let created_dateTime = new Date(createdDate);
  let year = created_dateTime.getFullYear();
  let month = ("0" + (created_dateTime.getMonth() + 1)).slice(-2);
  let day = ("0" + created_dateTime.getDate()).slice(-2);
  let hour = created_dateTime.getHours();
  let minute = created_dateTime.getMinutes();
  let seconds = created_dateTime.getSeconds();
  created_dateTime =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log(
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
  );
  let presentDate = new Date(present_dateTime);
  let dbDate = new Date(created_dateTime);
  let diff = (presentDate.getTime() - dbDate.getTime()) / (1000 * 60);
  console.log(diff);

  // logic
  if (diff < 10) {
    if (oldOtp.otp === req.body.otp) {
      let user = await User.findOneAndUpdate(
        { user_id: req.body.user_id },
        {
          password: req.body.password,
        },
        { new: true }
      );
      user = await user.save();
      return res.status(200).send("password changed  successfully");
    } else {
      res.status(400).json({
        responseCode: 400,
        errorMessage: "otp doesnt match please try again ",
      });
    }
  } else {
    res.status(400).json({
      responseCode: 400,
      errorMessage: "otp expired try to generate new otp ",
    });
  }
};

module.exports = resetPassword;
