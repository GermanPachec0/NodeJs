'use strict';
const {
  Model
} = require('sequelize');
const Task = require('./task');
const TaskCategories = require('./taskcategories');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categories.belongsToMany(models.Task,{
        through: 'TaskCategories',
        as:'tasks'
    
      })
    }

  }
  Categories.init({
    title: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};