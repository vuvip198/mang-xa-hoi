const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const authHeader=req.header('authorization');
    const token=authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({success:false,message:'access token fail'})
    }
    try{
        console.log(token)

        const decoded=jwt.verify(token,'phanquangvu1234');

        req.userId=decoded.userId;
        console.log(req.userId)
        next();
    }catch(error){
        console.log(error)
        return res.status(403).json({succcess:false,message:'invalid token'})
    }
    
}

module.exports=verifyToken;