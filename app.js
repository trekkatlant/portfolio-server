require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const db = require('./database/db');
let app = express();

//default route
app.use(cors());
app.use('/', router);

app.get('/', (req, res, next)=> {
	res.status(200).send("Default route");
})

if(db){
	app.listen(port, () => {
		console.log('Server connected on port' + port);
	});
else {
	console.log('Failed to connect to database');
}


module.exports=app;
