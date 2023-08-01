const Joi = require('joi');

const post = Joi.object({
  article_name: Joi.string().min(3).required(),
  excerpt: Joi.string().required(),
  price: Joi.number().positive().precision(2).required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
});

const patch = Joi.object({
  article_name: Joi.string(),
  excerpt: Joi.string(),
  price: Joi.number().positive().precision(2),
  image: Joi.string(),
  description: Joi.string(),
  category_id: Joi.number().integer(),
  quantity: Joi.number().integer(),
});

module.exports = {
  post,
  patch,
};
