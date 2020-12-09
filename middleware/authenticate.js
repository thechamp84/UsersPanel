const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Auth = mongoose.model('auth');
const User = mongoose.model('users');

module.exports.verifytoken = async (req, res, next) => {
    
    const token = req.header('token');
    if (!token) return res.status(401).send('Internal Error : No token input recieved!!');
    
    const dbtoken = await Auth.findOne({token: token});
    if (!dbtoken) return res.status(401).send('Token not found'); 
  
    const user = await User.findOne({_id:dbtoken.userid});   
    if (!user) return res.status(401).send('User Not Found');
    else return res.send("Welcome to Profile, Token Matched, Login Successfull!!!!!"+user); 
    next(); 
  }

module.exports.authenticate = async (req, res, next) => {
    
    const token = req.header('token');
    if (!token) return res.status(401).send('Internal Error : No token input recived!!');
    
    const dbtoken = await Auth.findOne({token: token});
    if (!dbtoken) return res.status(401).send('Token not found'); 

    const user = await User.findOne({_id:dbtoken.userid});   
    if (!user) return res.status(401).send('User Not Found');
    req.userDetails = user;
    next(); 
}

