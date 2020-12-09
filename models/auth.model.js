const mongoose = require('mongoose');

var authSchema = new mongoose.Schema({
    
    userid: {
       type: mongoose.Schema.Types.ObjectId,
       required : true
    }, 
    email: {
        type: String,
        required : true
    },
    token: {
        type: String,
        required : true
    }
},{ timestamps: true 
});

mongoose.model('auth', authSchema);