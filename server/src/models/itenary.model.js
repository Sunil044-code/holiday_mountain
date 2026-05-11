import mongoose, { mongo, Schema } from "mongoose";

const itenarySchema=new Schema({
    itenary_name:{
        type:String,
        required:true
    },
    trek_id:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Trek",
       required:true,
    },
    description:{
        type:String,
        required:true

    },
    day_number:{
        type:Number,
        required:true,

    },
    title:{
        type:String,
        required:true,
        trim:true,
    }

})

export const Itenary=mongoose.model("Itenary",itenarySchema)