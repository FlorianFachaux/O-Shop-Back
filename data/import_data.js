/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const logger = require('../app/utils/logger');

const saltRounds = 10;

const categories = require('./category.json');
const products = require('./product.json');
const users = require('./user.json');

(async () => {
  const client = new Client();
  await client.connect();

  logger.log('Connected');

  await client.query('TRUNCATE TABLE category, product RESTART IDENTITY CASCADE;');

  const categoryQueries = [];

  categories.forEach((category) => {
    const query = client.query(
      `
    INSERT INTO "category" 
    ("label", "slug", "description")
    VALUES ($1,$2,$3)
    RETURNING *`,
      [category.label, category.slug, category.description],
    );

    categoryQueries.push(query);
  });

  await Promise.all(categoryQueries);

  const productQueries = [];

  products.forEach((product) => {
    const query = client.query(
      `
      INSERT INTO "product"
      ("article_name", "excerpt", "price", "image", "description", "category_id", "quantity")
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [product.article_name,
        product.excerpt,
        product.price,
        product.image,
        product.description,
        product.category_id,
        product.quantity,
      ],
    );
    productQueries.push(query);
  });

  await Promise.all(productQueries);

  const userQueries = [];

  users.forEach(async (user) => {
    try {
      const newPwd = await bcrypt.hash(user.password, saltRounds);

      const query = await client.query(
        `
          INSERT INTO "user"
          ("firstname", "lastname", "email", "password", "address", "phone", "role", "promo", "isAdmin")
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
          RETURNING *`,
        [
          user.firstname,
          user.lastname,
          user.email,
          newPwd,
          user.address,
          user.phone,
          user.role,
          user.promo,
          user.isAdmin,
        ],
      );
      await userQueries.push(query);
    } catch (error) {
      logger.log(error);
    }
  });

  await Promise.all(userQueries);

  await logger.log('Done');
})();
