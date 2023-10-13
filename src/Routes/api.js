const express=require('express');
const router=express.Router();

//import controllers
const Usercontroller=require('../Controllers/UserControl');
//import middleware
const AuthverifyMiddeleware=require('../Middelwares/AuthVerifyMiddleware');

router.post('/registration',Usercontroller.registration);
router.post('/login',Usercontroller.login);
router.get('/profileDetails',AuthverifyMiddeleware,Usercontroller.profileDetails);
router.post('/profileUpdate',AuthverifyMiddeleware,Usercontroller.profileUpdate);
router.get('/verifyEmail/:email',AuthverifyMiddeleware,Usercontroller.verifyEmail);
router.get('/verifyOTP/:email/:otp',AuthverifyMiddeleware,Usercontroller.verifyOTP);
router.get('/resetPass',Usercontroller.resetPassword);

module.exports=router;