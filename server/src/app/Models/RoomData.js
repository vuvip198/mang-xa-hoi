const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RoomSchema=new Schema({
    name:{type:String,required:true},
    data:{type:Array,default:[]},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('rooms',RoomSchema);