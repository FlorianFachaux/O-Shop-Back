const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// Our model will get sequelize model back just like a CoreModel
class User extends Sequelize.Model {}

User.init({
  // We will list every columns from the table with the datatype
  // except columns such as xxx_id that will be defined in index.js

  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.TEXT,
  phone: Sequelize.TEXT,
  role: Sequelize.STRING,
  promo: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
}, {
  // We will list options used for our project : sequelize and le tablename
  sequelize,
  tableName: 'user',
});

// export our class to index.js
module.exports = User;
