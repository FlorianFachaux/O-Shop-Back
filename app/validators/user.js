const Joi = require('joi');

const createUser = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.number().integer().required(),
  role: Joi.string(),
  promo: Joi.string(),
  isAdmin: Joi.boolean(),
});

const connect = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().required(),
  address: Joi.string(),
  phone: Joi.string().length(10),
  role: Joi.string(),
  promo: Joi.string(),
  isAdmin: Joi.boolean(),
});

const editUser = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email({ tlds: { allow: true } }),
  password: Joi.string(),
  address: Joi.string(),
  phone: Joi.string().length(10),
  role: Joi.string(),
  promo: Joi.string(),
  isAdmin: Joi.boolean(),
});

module.exports = {
  createUser,
  connect,
  editUser,
};
