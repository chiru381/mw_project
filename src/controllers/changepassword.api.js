const bcrypt = require("bcrypt");
const { User } = require("../models/user.models");
const { validate } = require("../validators/changepassword.validation");

const changePassword = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let olduser = await User.findOne({ _id: req.params.id });
  console.log(olduser.password, ".........1");
  // var password = req.body.newPassword
  console.log(req.body.password, "..........2");
  const pass = await bcrypt.compare(req.body.password, olduser.password);
  if (olduser.user_id === req.body.user_id && pass) {
    // verify old password

    console.log("printing if............3");
    let user = await User.findByIdAndUpdate(
      req.params.id,
      {
        password: req.body.newPassword,
      },
      { new: true }
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); // crypt
    user = await user.save();

    return res.status(200).send("password changed  successfully");
  } else return res.status(404).send("password or userID doesnt match ");
};

module.exports = changePassword;
