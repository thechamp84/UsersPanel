const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Auth = mongoose.model('auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signup = async (req,res,next) => {

    try {
        
        const {name,email,password} = req.body;

        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email Already Exists!!!');

        const user = await new User({name,email,password}).save((err,doc) => {

            if(!err){ return res.send("User Created Successfully!! "+doc);}
            else{ return res.send("error occured : "+err);;}
        });
    } catch (error) {
     next(error);   
    }
}



exports.login = async (req, res, next) => {
    try{
        const {email,password} = req.body;
    
        const user = await User.findOne({email});
        if(!user) return res.status(400).send('Email does not exist!');
    
        const pass = await User.findOne({password});
        if(user.password!=password) return res.status(400).send('Email OR password not matched');
    
        const token = jwt.sign({ userid : user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
         console.log("newToken : "+token);
    
         const authenticate = await new Auth({userid : user._id,email,token}).save((err,doc) => {
          if(!err){
            console.log('NewToken saved '+doc);     
            return res.status(400).send('Login Token : '+token);
          }
        else{
            console.log(err.message);
        }
    });
    }
    catch(error){
      next(error);
    }
    }




exports.getuser = async(req,res,next) => {

    try {

        const userdetails = await User.find({_id:req.params.id}, (err,doc) => {
            if(!err) return res.status(400).send('User Details : '+doc);
            else return res.status(400).send('User Not Found');
        });
    } catch (error) {
        next(error);    
    }

}

exports.allusers = async(req,res,next) => {
    try {

        const allusers = await User.find({});
        if(allusers) return res.status(400).json(allusers);
        else return res.status(400).send('User Not Found');
    
    }   
    catch (error) {
    next(error);
    }
}

 
exports.updateuser = async(req,res,next) => {

    try {

        const updateuser = await User.findOneAndUpdate({_id:req.params.id},{ $set : req.body },{new: true, upsert: true, returnNewDocument : true});
            if(updateuser) return res.json(updateuser);
               else return res.status(400).send('User not Updated');
    }
    catch (error) {
        next(error);
    }
}



exports.deleteuser = async(req,res,next) => {

    try{
        const deleteuser = await User.findOneAndDelete({_id:req.params.id});
        if(deleteuser) return res.status(400).send('User Deleted Successfully!!!');
        else return res.status(400).send('User not Updated');
    }
    catch (error) {
        next(error);
    }
}