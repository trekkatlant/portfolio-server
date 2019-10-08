// require('dotenv').config();
// require('./models');
const Sequelize = require('sequelize');
const db = new Sequelize(
	"postgres://adminuser:Supersecret99.@stockdata.cyufrzd56tm1.us-east-2.rds.amazonaws.com:5432/postgres"
)
module.exports = db;