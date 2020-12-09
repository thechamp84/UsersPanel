
const express = require('express');
const router = express.Router();
const { signup, login, getuser, allusers, updateuser,deleteuser} = require('../controllers/user.controller');
const {adduserinfo,getuserinfo} = require('../controllers/userinfo.controller');
const {authenticate, verifytoken} = require('../middleware/authenticate');
const {uploads} = require('../controllers/aws.controller');

router.post('/signup',signup);
router.post('/login',login);
router.post('/verify',verifytoken);
router.get('/getuser/:id',getuser);
router.get('/allusers',allusers);
router.put('/updateuser/:id',updateuser);
router.delete('/deleteuser/:id',deleteuser);

router.post('/adduserinfo',authenticate,adduserinfo);
router.get('/getuserinfo/:id',getuserinfo);
router.post('/uploads',uploads);

module.exports = router;