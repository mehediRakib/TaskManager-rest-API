const express=require('express');
const router=express.Router();

//import controllers
const Usercontroller=require('../Controllers/UserControl');
router.post('/registration',Usercontroller.registration);
module.exports=router;