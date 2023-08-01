// import express for our router api
const express = require('express');

// import controllers
const articlesController = require('../controllers/api.articles');
const categoriesController = require('../controllers/api.categories');
const ordersController = require('../controllers/api.orders');
const usersController = require('../controllers/api.users');
const userMiddleware = require('../middlewares/user');
const adminMiddleware = require('../middlewares/admin');
const valideMiddleware = require('../middlewares/validate');
const schemaArticle = require('../validators/article');
const schemaUser = require('../validators/user');

const router = express.Router();

// routes articles
router.route('/articles')
  .get(articlesController.getAllArticles) // articles list
  .post([valideMiddleware(schemaArticle.post, 'body'), adminMiddleware], articlesController.postArticle); // create an article as an admin

// route in order to get/patch/delete one article
router.route('/articles/:article_id(\\d+)')
  .get(articlesController.getOneArticle)// get one article
  .patch([valideMiddleware(schemaArticle.patch, 'body'), adminMiddleware], articlesController.editArticle) // modify an article as an admin
  .delete(adminMiddleware, articlesController.deleteArticle);// delete an article as an admin

// route gets articles by catgory
router.get('/articles/category/:category_slug', articlesController.getArticlesByCategory);

// routes categories
router.get('/categories', categoriesController.getCategories);

router.route('/checkout')
  .get(userMiddleware, usersController.getProfilePage) // get info from user to purchase
  .post(userMiddleware, ordersController.insertOrder);

// routes for visitor in order to create an account
router.route('/signup')
  .post(valideMiddleware(schemaUser.createUser, 'body'), usersController.createUser);

// routes for users in order to log in
router.route('/login')
  .post(valideMiddleware(schemaUser.connect, 'body'), usersController.connecting);

// routes of account users
router.route('/account')
  .get(userMiddleware, usersController.getProfilePage)// get account
  .patch([valideMiddleware(schemaUser.editUser, 'body'), userMiddleware], usersController.editUser)// modify account
  .delete(userMiddleware, usersController.deleteUser); // delete account

router.route('/account/orders')
  .get(userMiddleware, ordersController.showAllOrdersAsUser);// get all orders as User
// .get(adminMiddleware, ordersController.showAllOrdersAsAdmin); // get all orders as Admin

router.route('/account/order/:order_id(\\d+)')
  .get(userMiddleware, ordersController.findOneOrder); // get order details

router.get('/admin', adminMiddleware, usersController.getAllAccountAsAdmin);

router.get('/check-email', usersController.checkTest);

// export for app.js
module.exports = router;
