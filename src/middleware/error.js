const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.messgae, err);
  // error
  //warn
  // info
  //verbose
  //debug
  //silly
  res.status(500).send("something is wrong ");
};
