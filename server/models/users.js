const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
name:{type:String,},
email:{type:String,},
pwd:{type:String,},
role:{type:String},
age:{type:String},
phone:{type:String},
country:{type:String},
city:{type:String},
image:{type:String},


})
const usermodule=mongoose.model("user",userschema);
module.exports=usermodule;