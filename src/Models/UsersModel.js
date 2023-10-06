const mongoose=require('mongoose');
const dataSchema=mongoose.Schema({
    email:{type:String,unique:true},
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:String},
    password:{type:String},
},{
    versionKey:false,
    timestamps:true,
    }
)

const UserModel=mongoose.model("users",dataSchema);
module.exports=UserModel;