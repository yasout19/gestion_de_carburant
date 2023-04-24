const mongoose=require('mongoose')
const feedbackschema=new mongoose.Schema({
name:{type:String,},
email:{type:String,},
message:{type:String,},
isUnRead: {type:Boolean},
createdAt:{type:Date}



})
const feedback=mongoose.model("feedback",feedbackschema);
module.exports=feedback;