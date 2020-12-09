const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Userinfo = mongoose.model('userinfo');
const User = mongoose.model('users');
const {ObjectId} = require('mongodb');


exports.adduserinfo = async(req,res,next) => {
try {
    
    const user_id = req.userDetails._id;
    if(!user_id){return res.status(400).send("Job_id not found");}

    var address = req.body.address;
    //const {contact,street,buildingNo,city,area,country,pincode} = req.body.address;
            //console.log(job_id,contact,street,buildingNo,city,area,country,pincode);
    const userinfos = await new Userinfo({user_id,address}).save((err,doc) => {
        if(!err){ return res.send("UserInfo Details Saved Successfully!! "+doc);}
        else{ return res.send("error occured " +err);}
    });     
} catch (error) {
    next(error);
}  
}


exports.getuserinfo = async(req,res,next) => {
    try {
 
        const user_id = req.params.id;
        console.log(req.params);


//POPULATE
        //     Userinfo
//    .findOne({user_id: ObjectId(user_id) })
//    .populate('user_id')
//    //.populate('user_id','name')
//    .then(user => {
//       res.json(user); 
//    });



//AGGREGATE
        var filter = {
           _id : ObjectId(user_id) 
        };
        console.log("filter :",filter);
        var agrre =  await User.aggregate([
            {"$match": filter},
            {
                "$lookup":
                  {
                    from: 'userinfos',
                    localField: "_id",
                    foreignField: "user_id",
                    as: "UserDetails"
                  }
             }
        ]);
         return res.send(agrre);
        console.log(agrre);

    } catch (error) {
        next(error);
    } 
}