const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User } = require("../models/user.models");
const { validate } = require("../validators/login.validation");
const auth = require("../middleware/auth");

const login = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ user_id: req.body.user_id });
  if (!user) return res.status(400).send("invaild user_id or passwords");

  // const validatePassword = await compare(req.body.password, user.password);
  // if (!validatePassword)
  //   return res.status(400).send("invaild user_id or password ");

  id = req.body.user_id;
  const token = auth.generateToken(id);

  // res.header("x-token", token).send({ user_id:req.body.user_id,msessage: "login successful"});
  res
    .status(200)
    .header("x-token", token)
    .send(
      _.pick(user, [
        "_id",
        "user_id",
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "status",
      ])
    );
};

module.exports = login;
