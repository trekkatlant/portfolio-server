import bcrypt from 'bcryptjs';
import config from '../config/data';
const db = require('../db');

const User = db.define({
	firstname :{
		type: String,
		required: true,
		trim: true
	},
	lastname:{
		type: String,
		required : true,
		trim: true
	},
	email:{
		type: String,
		required: true;
		unique: true,
		uniqueCaseInsensitive: true
		trim: true
	},
	password:{
		type: String,
		required: true
		len:[5,15]
	},
	balance: {
		type: int,
		required: true
	},
});

module.exports = User;