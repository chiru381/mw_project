const Joi = require("joi");

module.exports.validate = function (User) {
  const schema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    user_id: Joi.string(),
    email: Joi.string(),
    phone_number: Joi.string(),
    password: Joi.string(),
  });
  return schema.validate(User);
};
