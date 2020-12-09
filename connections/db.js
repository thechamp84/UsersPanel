const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true} , (err) => {

    if(!err){
        console.log(" MongoDb connection successfull!!!");
    }
    else{
        console.log("MongoDb Connection Failed : "+err);
    }
});

require('../models/user.model');
require('../models/auth.model');
require('../models/userinfo.model');