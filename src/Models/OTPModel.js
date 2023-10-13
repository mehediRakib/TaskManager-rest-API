const mongoose=require('mongoose');
const otpschema=mongoose.Schema(
    {
        email:{type:String},
        otp:{type:String},
        status:{type:Number,default:0},
    }
    ,{
        timestamps: true,
        versionKey:false
    }
)
const OTPModel=mongoose.model('otps',otpschema);
module.exports=OTPModel

