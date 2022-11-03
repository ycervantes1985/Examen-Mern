const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({
    marca:{
        type:String,
        required:[true,"La marca es obligatoria (back)"]
    },
    precio:{
        type:Number,
        required:[true,"El precio es obligatorio (back)"]
    },
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}]
},
{timestamps:true})

const Cars = mongoose.model("Cars",CarsSchema);

module.exports = Cars;