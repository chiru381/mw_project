const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User } = require("../models/user.models");
const { validate } = require("../validators/register.validation");

const register = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let { first_name, last_name, email, password, user_id, phone_number } =
    req.body;
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).send("user already exists");
  user = await new User({
    first_name,
    last_name,
    email,
    password,
    user_id,
    phone_number,
  });

  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  // const token =  user.generateAuthToken()
  // lodash  :- get new obj with properties of name and email
  // res.header('x-auth-token',token).send(_.pick(user,['_id','user_id','email','phone_number',"status"]))

  res.send(_.pick(user, ["_id", "user_id", "email", "phone_number", "status"]));
};
module.exports = register;
