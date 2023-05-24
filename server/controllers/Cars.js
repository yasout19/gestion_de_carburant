const CarModel = require('../models/Cars')

const ReadCar = async(req,res) => {   
    console.log(req.body.email)
    try {
        const cars = await CarModel.find({email:req.body.email})
        if (!cars || cars.length === 0) {
            return res.json({ error: "No data" })
        }
        console.log(cars);
        res.send(cars)
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const CreateCar = async(req,res) => {   
    try {
        const oldcar= await CarModel.findOne({matricule:req.body.matricule})
        if(!oldcar || oldcar.length==0){
        const newCar = new CarModel(req.body)
        await newCar.save()
       return res.json({status:"ok"})}
       return res.json({err:"matricule deja exist"});
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const DeleteCar = async(req,res) => {   
    try {
        const matricule = req.params.matricule;
        const car = await CarModel.findOneAndDelete({matricule: matricule})
        if (!car || car.length === 0) {
            return res.json({ error: "No data" })
        }
        res.json({status:"ok"});
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const UpdateCar = async(req,res) => {   
   console.log(req.body.modele);
  const car = await CarModel.findOne({matricule: req.body.matricule1})
        if(car){
            console.log(car);
            const newuser=await CarModel.updateOne({
                matricule:req.body.matricule1,
            },
            {
                $set:{
                    matricule : req.body.matricule,
                    marque : req.body.marque,
                    modele: req.body.modele,
                    la_date_de_lassurance : req.body.la_date_de_lassurance, 
                    la_duree_de_lassurance : req.body.la_duree_de_lassurance,
                    type_de_carburent : req.body.type_de_carburent,
                    la_capacite_du_reservoir : req.body.la_capacite_du_reservoir,
                    la_date_de_visite : req.body.la_date_de_visite,

                }
    
            })
            console.log(newuser);
          return res.json({status:"ok",data:newuser});
        }
        else{
            return res.json({status:"err",msg:"not found"});
        }
    };

const FindCarByMatricule = async(req,res) => {   
    const car = await CarModel.findOne({matricule: req.body.matricule})
    if(car){
        res.json({status:"ok",data:car,type_de_carburent:type_de_carburent})
        console.log(car);
    }
};

module.exports = {ReadCar , CreateCar, DeleteCar, UpdateCar, FindCarByMatricule }