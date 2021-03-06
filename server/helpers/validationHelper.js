const Joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }

      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    loginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    registerSchema: Joi.object().keys({
      fullname: Joi.string().min(3).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    }),
    oauthCompletionSchema: Joi.object().keys({
      fullname: Joi.string().required(),
      id: Joi.string().required(),
      email: Joi.string().email(),
      level: Joi.string(),
      verified: Joi.string(),
      status: Joi.string(),
      method: Joi.string(),
    }),
    searchScehma: Joi.object().keys({
      fullname: Joi.string().required(),
      user_id: Joi.string().required(),
      user: Joi.object().required(),
    }),
    createRoomSchema: Joi.object().keys({
      user_id: Joi.string().required(),
      friend_id: Joi.string().required(),
      user: Joi.object().required(),
    }),
    getRoom: Joi.object().keys({
      user_id: Joi.string().required(),
      user: Joi.object().required(),
    }),
    getChat: Joi.object().keys({
      room_id: Joi.string().required(),
      user: Joi.object().required(),
      skip: Joi.number(),
    }),
    sendChat: Joi.object().keys({
      room_id: Joi.string().required(),
      chat: Joi.string().required(),
      sender_id: Joi.string().required(),
      time: Joi.string().required(),
      status: Joi.string().required(),
      user: Joi.object().required(),
      friend_id: Joi.string().required(),
    }),
  },
};
