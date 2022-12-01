const config = require("config");
console.log(typeof config);

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey not defined");
  }
};
