const Room=require('../Models/RoomData');
const User=require('../Models/User')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { findOneAndUpdate, findOne } = require('../Models/User');
class RoomController{
    async add(req,res,next){
        const {name}=req.body;
        
        try{
        const check= await Room.findOne({name:name});
        if(check) {
            res.json({success:true,mess:'room exist',check})
        }else{
            const newPost= new Room({
               name,
               data:[]
            })
            await newPost.save();
            res.json({success:true,message:'happy learning',post:newPost})
        }
        }catch(err){
            console.log(err);
            res.status(500).json({success:false,message:'internal server'})
        }
    }


    async show(req,res,next){
        try{

            const rooms= await Room.find({});
           return res.json({success:true,rooms});
        }catch(err){
            console.log(err);
            res.status(500).json({success:false,message:'internal server'})
        }
    }

    
    async update(req,res,next){
        let updateRoom=null;
        console.log(req.params.id)
        try{
            let check =await Room.findOne({name:req.params.id})
            if (check){
                let data=check.data;
                data=data.push(req.body)
                const newRoom={
                    ...check,
                    data
                }
                updateRoom=await Room.findOneAndUpdate({name:req.params.id},newRoom,{new:true})
            }

            if(!updateRoom){
                return res.status(401).json({success:false,message:'post not found'})
            }
            res.json({success:true,message:'update finished',updateRoom})
        }catch(err){
            console.log(err);
            res.status(500).json({success:false,message:'internal server'})
        }
    }
   
    // async delete(req,res,next){
       
    //     try{
            
    //         const postDeleteCondition={_id:req.params.id,user:req.userId};
    //         let deletePost=await Post.findOneAndDelete(postDeleteCondition)
    //         console.log(deletePost)
    //         if(!deletePost){
    //             return res.status(401).json({success:false,message:'post not found'})
    //         }
    //         res.json({success:true,message:'delete finished',deletePost})

    //     }catch(err){
    //         console.log(err);
    //         res.status(500).json({success:false,message:'internal server'})
    //     }
    // }
   
        
    
}

module.exports=new RoomController;