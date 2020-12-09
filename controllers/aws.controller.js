// const aws = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');
// multer = require('multer');
// multerS3 = require('multer-s3');

// //configuring the AWS environment
// AWS.config.update({
//     // accessKeyId: process.env.Access_Key_ID,
//     // secretAccessKey: process.env.Secret_Access_Key


// });

// var s3 = new AWS.S3();
// var filePath = "50.jpg";

// //configuring parameters
// var params = {
//   Bucket: 'awsupload2020',
//   Body : fs.createReadStream(filePath),
//   Key : "uploads/"+Date.now()+"_"+path.basename(filePath)
// };

// s3.upload(params, function (err, data) {
  
//   if (err) {
//     console.log("Error", err);
//   }

//   //success
//   if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });



var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
 
var s3 = new aws.S3();
 
exports.uploads = async (req,res,next) => {

var upload = multer({
    storage: multerS3({
    s3: s3,
    bucket: 'awsupload2020',
    metadata: function (req, file, cb) {
      cb(null, {image : file.image});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
if(upload) { console.log("uploaded");
res.send('Successfully uploaded ' + req.files.length + ' files!')
}
else{ console.log("Error Ocurred")} 
}
// app.post('/upload', upload.array('image', 3), function(req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })