const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    rooms:{type:Array,default:[]},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('users',UserSchema);