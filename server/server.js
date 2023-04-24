const express=require('express')
const app=express()
const cors=require('cors')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const jwt_secret="jhwduhwque28012382903809218092{}/.,;'lgdyuew72838738edhuiwsn`1`109-0129307"
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))
const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://first:agadir555@cluster0.jeq63iu.mongodb.net/test?retryWrites=true&w=majority').catch((err)=>console.log(err));
const usermodule=require('./models/users');
const voituremodule=require('./models/voitures');
const feedback=require('./models/feedback');
const carburant=require('./models/carburant.js');
app.get('/users',async(req,res)=>{
const user=await usermodule.find();
res.json(user);
})
app.get('/voitures',async(req,res)=>{
    const voiture=await voituremodule.find();
    res.json(voiture);
})
app.post('/createuser',async (req,res)=>{
    const olduser=await usermodule.find({email:req.body.email})
    //console.log(olduser);
    if(!olduser.length){
    const user2=new usermodule(req.body);
    await user2.save();
     return res.json({ status:"ok",data:req.body});}
    else{
        console.log("user existed");
       return res.json({status:"error",msg:'user existed'})
    }


})
app.post('/signin',async (req,res)=>{
//const [email,pwd]=req.body;
const user= await usermodule.findOne({email:req.body.email});
 if(user){if(user.pwd==req.body.pwd) { const token=jwt.sign({email:req.body.email},jwt_secret); 
return res.json({status:"ok",data:token,role:user.role})
}}
return res.json({status:"error"});
})
app.post('/getuser',async (req,res)=>{
 const token=req.body.token
 const user=jwt.verify(token,jwt_secret)
  //console.log(token)
 // console.log(user.email)
 usermodule.findOne({email:user.email}).then(data=>{res.json(data)}).catch(err=>{console.log(err)})
})
app.post('/reset',async (req,res)=>{
const user=await usermodule.findOne({email:req.body.email})
if(!user){
 console.log("user not found");
 res.json({status:"error"});
}
else{
    const secret=jwt_secret+user.pwd;
    const token=jwt.sign({email:user.email,id:user._id},secret,{expiresIn:'5m'});
    const link=`http://localhost:4000/reset/${user._id}/${token}`;
    console.log(link);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yasout69@gmail.com',
          pass: 'nxvyfbftqmsxybly'
        }
      });
      
      var mailOptions = {
        from: 'yasout69@gmail.com',
        to: user.email,
        subject: 'reset password attention:this expires in 10 min',
        text: link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  res.json({status:"ok"})
}



})
app.get("/reset/:id/:token",async(req,res)=>{
    //console.log(req.params.id);
    const token=req.params.token;
    const user=await usermodule.findOne({_id:req.params.id});
    if(!user){
         return res.send("not verified");
    }
    else{
    const secret=jwt_secret+user.pwd;
    try {
        const verify=jwt.verify(token,secret);
        res.render("index",{email:verify.email,status:"notverified"})
        
    } catch (error) {
        res.send("not verified");
    }}

})
app.post("/reset/:id/:token",async(req,res)=>{
    const password=req.body.password;
    const user=await usermodule.findOne({_id:req.params.id});
    if(!user){
        return res.send("not verified");
    }
    else{
    const secret=jwt_secret+user.pwd;
    try {
        const verify=jwt.verify(req.params.token,secret);
        await usermodule.updateOne({
            _id:req.params.id,
        },
        {
            $set:{
                pwd:password,
            }

        }
        ).catch(err=>{console.log(err)})
        //res.json({status:"password updated"});
        res.render("index",{email:verify.email,status:"ok"})
        
    } catch (error) {
        res.send("not verified");
    }}

})
app.post('/deleteuser',async(req,res)=>{
const email=req.body.email;
const user=await usermodule.findOne({email:email});
if(user){
    await usermodule.deleteOne({email:email});
   return res.json({status:"ok"});
}
else{
    return res.json({status:"err"});
}



})
app.post('/updateuser',async(req,res)=>{
    const user=await usermodule.findOne({email:req.body.email1})
    if(user){
        const newuser=await usermodule.updateOne({
            email:req.body.email1,
        },
        {
            $set:{
                name:req.body.name,
                age:req.body.age,
                role:req.body.role,
            }

        })
      return res.json({status:"ok",data:newuser});
    }
    else{
        return res.json({status:"err",msg:"not found"});
    }





})
app.post('/updateadmin',async(req,res)=>{
    const user=await usermodule.findOne({email:req.body.email})
    if(user){
        console.log(user);
        const newuser=await usermodule.updateOne({
            email:req.body.email,
        },
        {
            $set:{
                name:req.body.name,
                phone:req.body.phone,
                country:req.body.country,
                city:req.body.city,
            }

        })
        console.log(newuser);
      return res.json({status:"ok",data:newuser});
    }
    else{
        return res.json({status:"err",msg:"not found"});
    }





})
app.post("/uploadimage",async(req,res)=>{
    console.log(req.body.image);
    console.log(req.body.email);
const user=await usermodule.findOne({email:req.body.email})
if(user){
    const newuser=await usermodule.updateOne({
        email:req.body.email,
    },
    {
        $set:{
           image:req.body.image,
        }

    })
   return res.json({status:"ok"})

}
else{
    return res.json({status:"err"})
}

})
app.post("/deleteusers", async (req, res) => {
    const email = req.body.data;
    try {
      await Promise.all(email.map(async data => {
        await usermodule.deleteOne({ email: data });
      }));
      return res.json({ status: "ok" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting users.' });
    }
  });
app.post("/feedback",async(req,res)=>{
    const feed = new feedback(req.body);
    try {
        await feed.save();
        console.log(feed);
        return res.json({status:"ok"});
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Error saving data"});
      }
})
app.get('/notification',async(req,res)=>{
    const notif=await feedback.find();
    res.json(notif);
    })
app.post('/markread',async(req,res)=>{
        const notif=await feedback.updateMany({},{$set:{isUnRead:false,}});
        console.log(notif);
        res.json(notif);
})
app.post('/markreadone',async(req,res)=>{
    const notif=await feedback.updateOne({_id:req.body.id},{$set:{isUnRead:false,}});
    console.log(notif);
    res.json(notif);
})
app.get('/prix',async(req,res)=>{
    const essence=await carburant.findOne({type:"essence"});
    const gazoil=await carburant.findOne({type:"gazoil"});
    try{
//
 console.log(essence.prix);
 console.log(gazoil.prix);
   return res.json({prix_g:gazoil.prix,prix_e:essence.prix});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: "Error finding data"});
    }
})
app.use((req,res)=>{
    res.redirect('/users');
})


app.listen('4000',()=>{console.log("lestening in port 4000")})
console.log('server running...');