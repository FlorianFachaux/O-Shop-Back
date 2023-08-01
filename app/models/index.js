const Category = require('./category');
const Product = require('./product');
const Order = require('./order');
const User = require('./user');
const OrderLine = require('./order_line');

// Associations

// Order <-> User (One-to-Many)
// One user can have many orders
User.hasMany(Order, {
  foreignKey: 'user_id',
  as: 'orders',
});

// One order has only one user
Order.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// Category <-> Product (One-to-Many)
// Ine one category, there's many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products',
});

// One product has only one category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

// Product <-> Order (Many-to-Many)
// One product can be on multiple different order
Product.belongsToMany(Order, {
  foreignKey: 'product_id',
  otherKey: 'order_id',
  as: 'orders',
  through: 'order_line',
});

// One order can have multiple different product
Order.belongsToMany(Product, {
  foreignKey: 'order_id',
  otherKey: 'product_id',
  as: 'products',
  through: 'order_line',
});

module.exports = {
  User, Category, Product, Order, OrderLine,
};
