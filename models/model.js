const Sequelize = require('sequelize');

const sequelize = require('./../database/database');

const User = sequelize.define('userdetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name:{
        type:Sequelize.STRING,
        allowNull : false
    },
    email:{
        type:Sequelize.STRING,
        allowNull : false
    },
    password :{
        type : Sequelize.STRING,
        allowNull:false
    },
    mydate:{
        type:Sequelize.DATE,
        defaultValue : Sequelize.NOW,
       
    },
  
    updatedAt : Sequelize.DATE

});

module.exports = User;