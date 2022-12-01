const { validate } = require("../validators/validateuser");
const { User } = require("../models/user.models");

const validateUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ user_id: req.body.user_id });
    if (!user)
      return res
        .status(200)
        .send("user doesnt exists, you can create with this user_id");
    else return res.status(400).send("user already exists");
  } catch {
    (err) => {
      "error ", err;
    };
  }
};
module.exports = validateUser;
