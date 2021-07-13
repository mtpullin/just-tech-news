//imports sequelize construction from library
const Sequelize  = require("sequelize");

//keeps password hidden and safe
require('dotenv').config();
//create connection to our database, pass in your MySql info for use;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;