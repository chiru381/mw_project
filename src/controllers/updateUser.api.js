const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user.models");
const { validate } = require("../validators/update.validation");

const updateUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      user_id: req.body.user_id,
      phone_number: req.body.phone_number,
    },
    { new: true }
  );
  if (!user)
    return res.status(404).send("the user with the given id not exists ");
  // console.log(user);
  user = await user.save();

  res.send(_.pick(user, ["_id", "user_id", "email", "phone_number", "status"]));
};
module.exports = updateUser;
