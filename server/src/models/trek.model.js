import mongoose, { Schema } from "mongoose";

const TrekSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true,

    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    
    region:{
        type:String,
        required:true,
        trim:true,

    },
    total_distance:{
        type: Number,
        required:true,
        trim:true,
        min:0

    },
    altidue:{
        type:Number,
        required:true,
        min:0,

    },
    estimated_duration:{
        type:String

    }
},{timestamps:true})

export const Trek=mongoose.model("Trek",TrekSchema)