const TripModel = require('../models/Trips')

const ReadTrip = async(req,res) => {   
    console.log(req.body.email);
    try {
        const trips = await TripModel.find({email:req.body.email})
        if (!trips || trips.length === 0) {
            return res.json({ error: "No data" })
        }
        console.log(trips);
        res.send(trips)
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const CreateTrip = async(req,res) => {   
    try {
        const newTrip = new TripModel(req.body)
        await newTrip.save()
        res.json({status:"ok"});
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const DeleteTrip = async(req,res) => {   
    try {
        const matricule = req.params.matricule;
        const trip = await TripModel.findByIdAndDelete(matricule)
        if (!trip || trip.length === 0) {
            return res.json({ error: "No data" })
        }
        res.status(200).json({status:"ok"});
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

const UpdateTrip = async(req,res) => {   
    try {
        const trip = await TripModel.findById(req.body.id)
        trip.matricule = req.body.matricule,   
        trip.date = req.body.Date,
        trip.distance= req.body.Distance,
        trip.quantite = req.body.Quantite, 
        trip.consommation = req.body.Consommation,
        trip.cout = req.body.Cout,
        trip.save()
        res.json({status:"ok"});
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

module.exports = {ReadTrip , CreateTrip, DeleteTrip,UpdateTrip}