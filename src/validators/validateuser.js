const Joi = require("joi");

module.exports.validate = function (userexists) {
  const schema = Joi.object({
    user_id: Joi.string().min(4).max(50).required(),
  });
  return schema.validate(userexists);
};
