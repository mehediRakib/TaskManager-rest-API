const UserModel=require('../Models/UsersModel');
const OTPModel=require('../Models/OTPModel');
const sendEmailUtility=require('../utility/SentEmailUtility');

const jwt=require('jsonwebtoken')


//registration
exports.registration=async (req,res)=>{
 try{
     const reqbody=req.body;
     const result=await UserModel.create(reqbody);
     res.status(200).json(
         {
             status:'success',
             data:result,
         }
     )
 }catch (e) {
     res.status(404).json({
         status:"fail",
         error:e.toString(),
     })

 }
}

//login
exports.login=async (req,res)=>{
    const reqbody=req.body;
    try {
        const result = await UserModel.find(reqbody).count();
        if (result === 1) {
            //login success
            // create JWT token
            let payload = {
                exp: Math.floor(Date.now() / 1000 + (24 * 60 * 60)),
                data: reqbody['email']
            }
            let token = jwt.sign(payload, "secretkey123");
            res.status(200).json({status: 'success', data: token});
        }
        else{
            //login fail
            res.status(404).json({status:'fail',data:"No user found"});
        }
    }catch (e) {
        //login fail
        res.status(404).json({status:'fail',error:e.toString(),});
    }

}


//_____profile Details_____//

exports.profileDetails=async (req,res)=>{
    try{
    let email=req.headers['email'];
    let result=await UserModel.find({email:email})
    res.status(200).json({
        status:'success',data:result
    })
    }catch (e) {
        res.status(404).json({
            status:'fail',
            error:e.toString(),
        })
    }
}



// profile update.....
exports.profileUpdate=async (req,res)=>{
    try{
        const email=req.headers['email'];
        const reqbody=req.body;
        const result=await UserModel.updateOne({'email':email},reqbody);
        res.status(200).json({status:"success",Data:result
        })

    }catch (e) {
        res.status(404).json({
            status:'fail',
            error:e.toString(),
        })

    }
}

//Recover Verify Email

exports.verifyEmail=async (req,res)=>{
    const email=req.params.email;
    let OTP=Math.floor(100000+Math.random()*900000);
    const editText="Your verification code is:"+OTP;
    let EmailSubject="Task Manager verification code";

    try{
        const result=await UserModel.find({email:email}).count();
        if(result===1){
            await sendEmailUtility(email,editText,EmailSubject);
            await OTPModel.create({email:email,otp:OTP});
            res.status(200).json({status:"success",data:"OTP message has been successfully send"});

        }else
        {
            res.status(404).json({
                status:'fail',
                data:"Unauthorized"
            })
        }

    }
    catch (e) {
        res.status(404).json({
            status:'fail',
            error:e.toString(),
        })
    }
    }


    //Recover Veryfy OTP
exports.verifyOTP=async (req,res)=>{
    const otp=req.params.otp;
    const email=req.params.email;
    let status=0;
    let statusUpdate=1;

    try{
        const result=await OTPModel.updateOne({email:email,otp:otp,status:status},{status:statusUpdate});
        res.status(200).json({
            status:"success",
            data:"Verification complited"
        })
    }catch (e) {
        res.status(401).json({
            status:"fail",
            error:e.toString()
        })
    }

}


//Reset Password

exports.resetPassword=async (req,res)=>{
try{
    const email=req.body['email'];
    let otp=req.body['OTP'];
    let password=req.body['password'];

    const statusUpdate=1;

    let count=await OTPModel.find({email:email,otp:otp,status:statusUpdate}).count();
    if(count===1) {
        await UserModel.updateOne({email: email}, {password: password})
        res.status(200).json({status: "success", data: "Password changed"})
    }
    else{
        res.status(200).json({status: "fail", data: "Unauthorized"});
    }
}catch (e) {
    res.status(401).json({
        status:"fail",
        error:e.toString()
    })
}
}



