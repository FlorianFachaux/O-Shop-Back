/* eslint-disable no-param-reassign */
// const {
//   Order, Product, User, OrderLine,
// } = require('./app/models');
const logger = require('./app/utils/logger');

// async function findOrder(id) {
//   const order = await Order.findByPk(id, {
//     raw: true,
//     required: false,
//     nest: true,
//     include: [
//       {
//         model: Product,
//         as: 'products',
//         attributes: ['article_name', 'price'],
//         through: {
//           model: OrderLine,
//           as: 'order_line',
//           attributes: ['quantity'],
//           paranoid: true,
//           required: false,
//         },
//       },
//     ],
//   });
//   logger.log(order);
// }

// findOrder(2);

// async function showAllOrdersAsUser(id) {
//   const userConnected = await User.findByPk(id, {
//     raw: true,
//     nest: true,
//     include: [
//       {
//         model: Order,
//         as: 'orders',
//         include: [
//           {
//             model: Product,
//             as: 'products',
//             attributes: ['article_name', 'price'],
//             through: [{
//               attributes: ['quantity'],
//             }],
//           },
//         ],
//       },
//     ],
//     paranoid: true,
//     required: false,
//   });
//   logger.log('user', userConnected);
// }

// showAllOrdersAsUser(1);

async function test(data, article) {
  Object.keys(data).forEach((column) => {
    if (data[column]) {
      article[column] = data[column];
    }
    logger.log(article);
  });
}
const newArticle = {
  firstname: 'Karine',
  lastname: 'Dupont',
};
const newData = {
  firstname: 'Brigitte',
};

test(newData, newArticle);
