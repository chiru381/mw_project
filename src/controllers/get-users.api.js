const { User } = require("../models/user.models");

const getusers = async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users)
    res.status(200).json({ result: "Success", users: users });
  } catch {
    (err) => {
      "error in getting all users", err;
    };
  }
};

module.exports = getusers;
