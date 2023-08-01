const {
  Order, OrderLine, Product, User,
} = require('../models');

const ordersController = {
  // Maybe we should create a function showOrderAdmin & showOrderUser
  // (with a specific route /orders/:user_id) to differentiate the two
  async showAllOrdersAsAdmin(req, res) {
    try {
      // QUERY : SELECT * FROM order
      // JOIN user ON order.user_id = user.id
      // JOIN order_line ON order.id = order_line.order_id
      // JOIN product ON order_line.product_id = product.id
      const orders = await Order.findAll({
        include: 'products',
      });
      res.json('All orders (Admin) =====>', orders);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },
  async insertOrder(req, res) {
    try {
      // 1 - Save the user_id that will be injected in Order table
      // QUERY : SELECT * FROM user WHERE id = $1;
      const userConnected = await User.findByPk(req.user.userId);

      // 2 - Save the date of purchase
      const now = new Date();
      const paidAt = now.toISOString();

      // 3 - Create the order
      // QUERY : INSERT INTO order ("user_id", "paid_at")
      // VALUES ($1,$2) RETURNING *;
      const newOrder = await Order.create({
        user_id: userConnected.id,
        paid_at: paidAt,
      });
      await newOrder.save();

      // 4 - Save order id and get the product paid from posted form
      const newOrderId = newOrder.id;
      const productsPaid = req.body;

      // 5 - Create order lines with order_id saved earlier and info from form
      productsPaid.forEach(async (product) => {
        // QUERY : INSERT INTO order_line ("order_id","product_id","quantity")
        // VALUES ($1,$2,$3) RETURNING *;
        const orderLine = await OrderLine.build({
          order_id: newOrderId,
          product_id: product.product_id,
          quantity: product.quantity,
        });

        await orderLine.save();
      });
      // We can't get all the product after creation
      res.json('newOrder created successfully !');
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },
  async showAllOrdersAsUser(req, res) {
    try {
      // QUERY : SELECT * FROM order
      // JOIN user ON order.user_id = user.id
      // ! MUST BE COMPLETED
      // WHERE id = $1;
      const userConnected = await User.findByPk(req.user.userId, {
        include: [
          {
            model: Order,
            as: 'orders',
            attributes: ['id', 'paid_at'],
            include: [
              {
                model: Product,
                as: 'products',
                attributes: ['id', 'article_name', 'price'],
                through: {
                  attributes: ['quantity'],
                },
              },
            ],
          },
        ],
      });

      res.status(200).json({ userConnected });
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },
  async findOneOrder(req, res) {
    try {
      // QUERY : SELECT * FROM user
      // JOIN order ON user.id = order.user_id
      // JOIN order_line ON order.id = order_line.order_id
      // JOIN product ON order_line.product_id = product.id
      // WHERE id = $1;
      const orderId = parseInt(req.params.order_id, 10);
      const userConnected = await User.findByPk(req.user.userId, {
        include: [
          {
            model: Order,
            as: 'orders',
            attributes: ['id', 'paid_at'],
            where: {
              id: orderId,
            },
            include: [
              {
                model: Product,
                as: 'products',
                attributes: ['id', 'article_name', 'price'],
                through: {
                  attributes: ['quantity'],
                },
              },
            ],
          },
        ],
      });
      res.status(200).json({ userConnected });
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },
};

module.exports = ordersController;
