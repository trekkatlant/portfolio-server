const Sequelize = require('sequelize');
const db = require('../db');
//const sequelize = new Sequelize('db', 'stock');

const Transaction = db.define('transaction', {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        require: true
    },
    symbol : {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        required: true
    },
    quantity : {
        type: Sequelize.FLOAT,
        allowNull: false,
        required:true
    },
    purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
        required:true
    }
},
{
    timestamps:false
});