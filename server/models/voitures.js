const mongoose=require('mongoose')
const voitureschema=new mongoose.Schema({
    modele:String,
    marque:String
})
const voiturmodule=mongoose.model('voitures',voitureschema)
module.exports=voiturmodule;