// const express =  require('express');
// const auth = express.Router();
// const User =  require('../db/models/user')
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// //const jwt = require('jsonwebtoken');
// //const cookieParser = require('cookie-parser');
// const { check, validationResult } = require('express-validator');
// auth.use(bodyParser.json());
// auth.use(express.json());

// //validate that singup credintials are valid
// auth.post('/signup', [
// 	check('email').isEmail(),
// 	check('firstname').isLength({min: 2}),
// 	check('lastname').isLength({min: 2}),
// 	check('password').isLength({min: 5})
// ], async(req, res, next) =>{
// 	//wraps the validation errors in an object
// 	const errors = validationResult(req);
// 	if(!errors.isEmpty()){
// 		return res.status(422).json({errors: errors.array()});
// 	}	
// 	let hash_pass = bcrypt.hash(req.body.password, 8);
// 	let newUser = new User({
// 		firstname: req.body.firstname,
// 		lastname: req.body.lastname,
// 		email: req.body.email,
// 		password: hash_pass,
// 		balance : 5000
// 	})
// 	await User.create(newUser, (err, user) => {
// 		if(err) {
// 			res.json({
// 				success: false,
// 				msg: 'Singup failed',
// 				err: err
// 			});
// 		}
// 		else {
// 			res.json({
// 				success: true,
// 				msg: 'Signed up successfully'
// 			});
// 		}
// 	});
	
// });

// auth.post('/login', (req, res, next) => {
// 	User.findOne({email: req.body.email})
// 		.exec(function(err, user) {
// 			if(err) {
// 				res.send(err)
// 			}
// 			else if(!user) {
// 				var err = new Error('User not found!');
// 				err.status = 401;
// 				res.send(err);
// 			}
// 			bcrypt.compare(req.body.password, user.password, function(err, result) {
// 				if(result === true) {
// 					res.status(200).send(null, user);
// 				}
// 				else{
// 					res.send(err);
// 				}
// 			})
// 		});
// });

// auth.get('/logout', (req, res, next) =>{
// 	if(req.session) {
// 		req.session.destroy((err) =>{
// 			if(err) {
// 				res.send(err);
// 			}
// 			else {
// 				res.status(200).send("Logout successfull!");
// 			}
// 		});
// 	}
// });


// module.exports = auth;

const express = require('express');
const bodyParser = require('body-parser');
const auth = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('../db/models/user')


auth.use(bodyParser.json());
auth.use(cookieParser());
auth.use(session({
    secret: 'stockAuth',
    resave: false,
    saveUninitialized: true
}));

auth.post('/signup',
    [check('email').isEmail(),
    check('firstname').isLength({ min: 1 }),
    check('lastname').isLength({ min: 1 }),
    ], async (req, res, next) => {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() })
            }
            else {
                let hash_pass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
                let newUser = await User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash_pass,
                    balance: 5000.00
                });
                req.session.user = newUser;
                res.status(201).send(newUser);
            }
        } catch (err) {
            res.status(400).send(err);
        }
})

auth.post('/signin', async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let payload = { email: user.email };
                let token = jwt.sign(payload, 'stockAuth');
                req.session.user = user;
                res.status(200).send({ user, token });
            } else {
                res.status(400).send('Invalid password.');
            }
        }
        else {
            res.status(400).send('Invalid credentials.');
        }
    } catch (err) {
        res.status(400).send(err);
    }
})



auth.get('/signout', (req, res, next) => {
    req.session.destroy;
    res.status(200).send("Sign out successful.");
})
  
auth.get('*', (req, res, next) => {
    res.status(200).send('Invalid HTTP method.');
})
module.exports = auth;

			

	
	