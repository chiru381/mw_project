const { User } = require("../models/user.models");

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
      } catch (error) {
        console.log(error);
      }
}

module.exports = deleteUser