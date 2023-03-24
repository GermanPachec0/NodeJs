'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
const Task = require('./task');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password_hash: DataTypes.STRING,
    password: DataTypes.VIRTUAL
  }, {
    sequelize,
    modelName: 'User',
  });

  User.login = (email,password) => {
    //busca usuario
    return User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      //comparedPassowrdHased
      if(!user) return null;
     return user.autenthicatePassword(password,user.password_hash).then(valid => valid ? user : null);
    })
  };

  User.prototype.autenthicatePassword= (password,password_hash) =>{
    return new Promise((res,rej) =>{
      bcrypt.compare(password,password_hash,(err,valid) =>{
          if (err) return rej(err);
          res(valid);
      })
    })
  }

  User.beforeCreate((user,options)=>{
    return new Promise((res,rej)=>{
      bcrypt.hash(user.password,10,(error,hash)=>{
        if(user.password){
        user.password_hash = hash;
        res();
        }
      });
    });
      
  });

  User.associate = (models) =>{
    User.hasMany(models.Task,{
      as:'tasks'
    })
    
  }

  return User;
};