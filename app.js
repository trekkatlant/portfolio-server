require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const db = require('./db/db');
const app = express();
//const bodyParser = require('body-parser');
// const router = express.Router();
const authRouter = require('./routes/auth')
const User = require('./db/models/user')
//app.use(bodyParser.json());
//default route
app.use(cors());
//app.use('/', router);
app.use('/auth', authRouter);

// db.sync({
// 	force:true
// })
app.get('/', async(req, res, next)=> {
	try {
		let data = await User.findAll();
		console.log(data);
		res.status(200).send('ok.')
	} catch(err) {
		res.status(400).send(err);
	}
})

//if(db){
	app.listen(port, () => {
		console.log('Server listening on port ' + port);
	});
//}
/*else {
	console.log('Failed to connect to database');
}*/


module.exports=app;
