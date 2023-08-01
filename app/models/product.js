const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// Our model will get sequelize model back just like a CoreModel
class Product extends Sequelize.Model {}

Product.init({
  // We will list every columns from the table with the datatype
  // except columns such as xxx_id that will be defined in index.js

  article_name: Sequelize.STRING,
  excerpt: Sequelize.TEXT,
  price: Sequelize.DECIMAL,
  image: Sequelize.TEXT,
  description: Sequelize.TEXT,
  quantity: Sequelize.INTEGER,
}, {
  // We will list options used for our project : sequelize and le tablename
  sequelize,
  tableName: 'product',
});

// export our class to index.js
module.exports = Product;
