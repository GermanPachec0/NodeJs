const express = require('express');

let CategoriesController = require('../controllers/categories');

let router  = express.Router();

router.route('/categories').get(CategoriesController.index).post(CategoriesController.create);
router.route('/categories/:id').put(CategoriesController.update).delete(CategoriesController.destroy);


module.exports = router;
