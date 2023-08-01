const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// Our model will get sequelize model back just like a CoreModel
class Order extends Sequelize.Model {}

Order.init({
  // We will list every columns from the table with the datatype
  // except columns such as xxx_id that will be defined in index.js

  paid_at: Sequelize.DATE,
}, {
  // We will list options used for our project : sequelize and le tablename
  sequelize,
  tableName: 'order',
});

// export our class to index.js
module.exports = Order;
