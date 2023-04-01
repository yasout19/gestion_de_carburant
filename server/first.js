// const name='nom';
// console.log('hello' ,name);
// let hello=(name)=>{
//     console.log('hello',name);
// }
// hello('ahmed');
// setTimeout(() => {
//     //console.log("hi");
//     clearInterval(loop);
// }, 4000);
// const loop=setInterval(()=>{console.log("hi");},1000);
// console.log(__dirname);
// console.log(__filename);
// const {user,age}=require('./user');
// console.log(user,age);
// const os=require('os');
// console.log(os.platform(),os.homedir());
//const fs=require('fs');
// fs.readFile('./text.txt',(err,data)=>{
//     if(err){console.log("err");} 
//     console.log(data.toString());
// });
// fs.writeFile('./text.txt','hello world',()=>{console.log('done!');});
const express = require('express');
const mongoose = require('mongoose');

const server = express();
const port   = 8080;

const url = "mongodb+srv://first:agadir555@cluster0.jeq63iu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => console.log("Connected"))
    .catch(err => console.log(err) );

server.get('/',(req,res) => {
    res.send("Hicham");
}).listen(8080);

console.log("Server is starting ...");

