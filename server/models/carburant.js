const mongoose=require('mongoose')
const carburantschema=new mongoose.Schema({
type:{type:String,},
prix: {type:Number,double:true },
})
const carburant=mongoose.model("carburant",carburantschema);
module.exports=carburant;