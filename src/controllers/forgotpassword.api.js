const { User } = require("../models/user.models");
const Otp = require("../models/otp.models");
const { validate } = require("../validators/forgotpassword.validation");
const sendEmail = require("../utils/sendEmail");

const forgotPassword = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ user_id: req.body.user_id });
  console.log(user.email, "testing");
  if (!user) return res.status(400).send("user with given email doesn't exist");

  // const responseType = {};
  let otpCode = Math.floor(1000 + Math.random() * 900000);
  let otpData = new Otp({
    user_id: req.body.user_id,
    otp: otpCode,
    // expiresIn: new Date().getTime() + 300 * 1000,
  });

  await otpData.save();

  let email = user.email;
  console.log(email, otpCode, "............");

  // const link = `http://localhost:6060/password-reset/${user._id}/`;

  await sendEmail(email, otpCode);
  res.send("password reset otp is sent to your email");
};

module.exports = forgotPassword;
