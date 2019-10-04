const express =  require('express');
const auth = express.Router();
import User from '../user';
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

auth.use(bodyParser.json());

//validate that singup credintials are valid
auth.post('/signup', [
	check('email').isEmail(),
	check('firstname').isLength({min: 2})
	check('lastname').isLength({min: 2})
	check('password').isLength({min: 5})
], (req, res, next) =>{
	//wraps the validation errors in an object
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(422).json({errors: errors.array()});
	}	
	let hash_pass = bcrypt.hash(req.body.password, 10);
	let newUser = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hash_pass;
		balance : 5000
	});
	User.create(newUser, (err, user) => {
		if(err) {
			res.json({
				success: false,
				msg: "Singup failed',
				err: err
			});
		}
		else {
			res.json({
				success: true;
				msg: 'Signed up successfully'
			});
		}
	});
	
});

	
	