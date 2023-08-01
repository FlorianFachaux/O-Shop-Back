const logger = require('../utils/logger');

const isValid = (schema, datasource = 'body') => async (req, res, next) => {
  try {
    await schema.validateAsync(req[datasource], {
      abortEarly: false, // to check info before
    });
    next();
  } catch (error) {
    res.status(401).json(error);
    logger.log(error);
  }
};

module.exports = isValid;
