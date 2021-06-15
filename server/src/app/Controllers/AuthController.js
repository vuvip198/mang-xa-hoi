const User=require('../Models/User');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController{
    // post login
   async login(req,res,next){
        try {
            const {username,password}=req.body;
            if(!username||!password){
                return res.status(400).json({success:false,messenger:'missing username or password'})
            }
           const user= await User.findOne({username});
           const validPassword=await bcrypt.compare(password,user.password)
            console.log(validPassword)
           if(!validPassword){
            return res.status(400).json({success:false,messenger:'username or password wrong!'})
           }
            const accessToken=jwt.sign({userId:user._id},'phanquangvu1234')
            res.json({success:true,message:'success',accessToken})
        }catch (error) {
            console.log(error)
            res.status(500).json({success:false,message:'server dang bao tri'})
        }
        
    }

    async register(req,res,next){
         try {
             console.log(req)
            const {username,password}=req.body;
            if(!username||!password){
                return res.status(400).json({success:false,messenger:'missing username or password'})
            }
            let users= User.find({username:username});
            if(users.length>0){
                    return res.status(400).json({success:false,messenger:'username is already'})
            }
            else{
                
            const hashPassword=await bcrypt.hash(password,10);
            console.log(typeof hashPassword)
            const newUser=new User({
                username,
                password:hashPassword,
            });
            newUser.save();
            const accessToken=jwt.sign({userId:newUser._id},'phanquangvu1234')
            res.json({success:true,message:'success',accessToken})
            }

         } catch (error) {
             console.log(error)
             res.status(500).json({success:false,message:'server dang bao tri'})
         }
        
    }

    async index(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password')
            if (!user)
                return res.status(400).json({ success: false, message: 'User not found' })
            res.json({ success: true, user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

}

module.exports=new AuthController;