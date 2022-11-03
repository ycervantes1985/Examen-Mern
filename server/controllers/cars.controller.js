const Cars = require ("../models/autos.model")
const { Review } = require("../models/review.model")

module.exports.findAll = (req,res) => {
    Cars.find()
        .then((all)=>res.json({cars:all}))
        .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}

module.exports.create = (req,res) => {
    Cars.create(req.body)
        .then((newCar)=>res.json({message:"",car:newCar}))
        .catch((err)=>res.json({message:"Algo salio mal",errors:err.errors}))
}

module.exports.createCar = async(req,res)=>{
    try{
        const {marca,precio,rating,content} = req.body;
        const review = new Review({rating,content,creatorName:"Nombre usuario"});
        const car = new Cars({marca,precio});
        car.reviews.push(review);
        await car.save();
        await review.save();
        res.json({message:"",car:car,review:review})
    }
    catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}

module.exports.findOne = (req,res) => {
    Cars.findOne({_id: req.params.id})
        .then((car)=>res.json({car:car}))
        .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}

module.exports.update = (req,res) => {
    Cars.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
        .then((car)=>res.json({car:car}))
        .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}

module.exports.delete = (req,res) => {
    Cars.deleteOne({_id: req.params.id})
        .then((result)=>res.json({resultado:result}))
        .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}
