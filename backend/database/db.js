const Sequelize = require('sequelize');

const sequelize = new Sequelize('candyShop','root','Personal.123@',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;