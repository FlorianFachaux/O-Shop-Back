/* eslint-disable camelcase */
// import datas from db through models index
const { Product } = require('../models');
const logger = require('../utils/logger');
const functions = require('../utils/functions');

// articles object containing method get/post/patch/delete
const articlesController = {

  // Function to get every articles created
  async getAllArticles(req, res) {
    try {
      // QUERY : SELECT * FROM product;
      const articles = await Product.findAll();
      // If OK, we'll get our products and 200 OK
      res.json(articles);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async postArticle(req, res) {
    try {
      // QUERY : INSERT INTO product (name, excerpt, price, image, description, category_id)
      // VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;
      logger.log(req.body);
      const newArticle = await Product.build({
        article_name: req.body.article_name,
        excerpt: req.body.excerpt,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        category_id: req.body.category_id,
        quantity: req.body.quantity,
      });
      await newArticle.save();
      res.json(newArticle);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async editArticle(req, res) {
    // QUERY: UPDATE "product" SET $1=$2 WHERE id = $3 RETURNING *;
    try {
      const articleId = req.params.article_id;
      const article = await Product.findByPk(articleId);
      functions.patch(req.body, article);
      await article.save();
      res.json(article);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async deleteArticle(req, res) {
    try {
      // QUERY : DELETE FROM product WHERE id = $1;
      const articleId = req.params.article_id;
      const article = await Product.findByPk(articleId);
      await article.destroy();
      res.json('ok');
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async getOneArticle(req, res) {
    // QUERY : SELECT * FROM product WHERE id = $1;
    try {
      const articleId = parseInt(req.params.article_id, 10);
      const article = await Product.findByPk(articleId);
      res.json(article);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async getArticlesByCategory(req, res) {
  // QUERY : SELECT product.*, category.label FROM product
  // JOIN category ON category_id = category.id WHERE category.label = '$1';
    try {
      const categorySlug = req.params.category_slug;
      const articlesbycategory = await Product.findAll({
        include: {
          association: 'category',
          where: {
            slug: categorySlug,
          },
        },
      });
      res.json(articlesbycategory);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
};

module.exports = articlesController;
