const express = require('express');
const user = express.Router();
const Users = require("../db/models/user");
const bodyParser = require('body-parser');

user.use(bodyParser.json());


//update balance
user.put('/:id', async(req,res, next)=> {
    try{
        let data = Users.update({balance: req.body.balance}, {where: {id: req.params.id}});
        if(data){
            res.send('Balance updated successfully');
        }
    }
    catch(err){
        res.send(err);
    }
});

//find user
user.get('/:email', async(req, res, next)=> {
    try{
        const data = Users.findOne({where: {email: req.params.email}, attributes: {exclude: ['password']}});
        if(data) {
            res.json(data);
        }
        else{
            res.send('user npt found!');
        }
    }
    catch(err){
        res.send(err);
    }
});

module.exports = user;