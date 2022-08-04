"use strict";
const Joi = require("joi");
module.exports = async (req, res, next) => {
  const body = req.body;
  const schema = Joi.object()
    .keys({
      nickname: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{4,30}$"))
        .required(),
      confirm: Joi.ref("password"),
    })
    .with("password", "confirm");

  try {
    // 검사시작
    await schema.validateAsync(body);
  } catch (e) {
    // 유효성 검사 에러
    return res.status(400).json({ code: 400, message: e.message });
  }
  next();
};
