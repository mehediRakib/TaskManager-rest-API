const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
    let Token=req.headers['token'];
    jwt.verify(Token,"secretkey123",(err,decoded)=>{
        if(err){
            console.log(Token);
            res.status(401).json({status:"fail",data:'Unauthorized'})
        }
        else{
            let email=decoded['data'];
            console.log(email);
            req.headers.email=email;
            next();
        }
    })

}



