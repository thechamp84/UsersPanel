const mongoose = require('mongoose');

var userinfoSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    address: {

        contact:{
            type: String
        },
        street:{
            type: String
        },
        buildingNo:{
            type: String
        },
        city:{
            type: String,
        },
        area:{
            type: String
        },
        country:{
            type: String,
        },
        pincode:{
            type: String
        }
    }    
},{ timestamps: true 
    });
    
    
    mongoose.model('userinfo', userinfoSchema);