const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// Our model will get sequelize model back just like a CoreModel
class OrderLine extends Sequelize.Model {}

OrderLine.init({
  // We will list every columns from the table with the datatype
  // except columns such as xxx_id that will be defined in index.js

  order_id: Sequelize.INTEGER,
  product_id: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
}, {
  // We will list options used for our project : sequelize and le tablename
  sequelize,
  tableName: 'order_line',
});
OrderLine.removeAttribute('id');

// export our class to index.js
module.exports = OrderLine;
