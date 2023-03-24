'use strict';
const {
  Model, TableHints
} = require('sequelize');
const User = require('./user');
const categories = require('./categories');
const TaskCategories = require('./taskcategories');
const client = require('./realtime/client');
const { options } = require('../routes/tasks_routes');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
   
    
  }
  Task.init({
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Task',
  });


 Task.associate = (models) =>{
  Task.belongsTo(models.User,{
    foreignKey:'userId',
    as:'user'
  })

  Task.belongsToMany(models.Categories,{
    through: 'TaskCategories',
    as:'categories',

  });

  Task.afterCreate(() =>(task,options) => {
    Socket.emit('new_task',{
      ...task
    })
  })
 }

  return Task;
};