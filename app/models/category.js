const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// Our model will get sequelize model back just like a CoreModel
class Category extends Sequelize.Model {}

Category.init({
  // We will list every columns from the table with the datatype
  // except columns such as xxx_id that will be defined in index.js

  label: Sequelize.STRING,
  slug: Sequelize.STRING,
  description: Sequelize.TEXT,
}, {
  // We will list options used for our project : sequelize and le tablename
  sequelize,
  tableName: 'category',
});

// export our class to index.js
module.exports = Category;
