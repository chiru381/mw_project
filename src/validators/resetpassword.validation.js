const Joi = require("joi");

module.exports.validate = function (User) {
  const schema = Joi.object({
    user_id: Joi.string(),
    otp: Joi.string(),
    password: Joi.string(),
  });
  return schema.validate(User);
};
