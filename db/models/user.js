//import bcrypt from 'bcryptjs';
// import config from '../config/data';
const Sequelize = require('sequelize');
const db = require('../db');
//const sequelize = new Sequelize('db', 'user');

const User = db.define('user', {
    firstname : {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        trim: true
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        trim: true
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
        unique: true,
        trim: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
        len: [2,20],
        trim: true
    },
    balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        required: true,
        trim: true
    } 
},
{
    timestamps:false
});

module.exports = User;