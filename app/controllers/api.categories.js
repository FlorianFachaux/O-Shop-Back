// import datas from db through models index
const { Category } = require('../models');

// categories object containing method get/post/patch/delete
const categoriesController = {

  async getCategories(req, res) {
    // QUERY : SELECT * FROM category;
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },
};

module.exports = categoriesController;
