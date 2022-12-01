const Joi = require("joi");

module.exports.validate = function (loginUser) {
  const schema = Joi.object({
    user_id: Joi.string().min(4).max(255).required(),
  });
  return schema.validate(loginUser);
};
