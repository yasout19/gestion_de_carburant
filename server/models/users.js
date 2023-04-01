// const user=['user1','user2','user3'];
// const age=['age1','age2','age3'];
// //console.log(user);
// module.exports={user,age};
//const { Int32 } = require('bson');
const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
name:{type:String,},
email:{type:String,},
pwd:{type:String,},
role:{type:String},
age:{type:String},



})
const usermodule=mongoose.model("user",userschema);
module.exports=usermodule;