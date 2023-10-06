const UserModel=require('../Models/UsersModel');


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