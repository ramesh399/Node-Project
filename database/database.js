const Sequelize = require("sequelize");

const sequelize = new Sequelize("sampledb","root","",{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;
// Database created.  