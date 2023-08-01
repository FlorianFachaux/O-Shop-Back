const Joi = require('joi');

const orderLine = Joi.object({
  order_id: Joi.number().integer().positive(),
  product_id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().min(1)
    .required(),
});

module.exports = {
  orderLine,
};
