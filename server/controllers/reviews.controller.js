
const Cars = require("../models/autos.model")
const {Review} = require("../models/review.model")

module.exports.createReview = async(req,res)=>{
    try{
        const {rating,content,idCar} = req.body;
        const review = await Review.create({rating,content,creatorName:"Nombre del usuario loggueado"});
        const car = await Cars.findById(idCar).exec();
        car.reviews.push(review);
        await car.save();
        res.json(review);
    }
    catch(err){
        res.json(err)
    }
}

module.exports.getReviewsFromCar = async(req,res)=>{
    try{
        const {idCar} = req.params;
        const car = await Cars.findById(idCar).populate("reviews").exec();
        console.log("REVIEWS DEL CAR",car.reviews);
        res.json({message:"",reviews:car.reviews})
    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}


module.exports.getReviews = async(req,res)=>{
    try{
        const {id} = req.params;
        const review = await Review.findById(id).exec();
        console.log("REVIEWS DEL CAR",review);
        res.json({message:"",review:review})
    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}