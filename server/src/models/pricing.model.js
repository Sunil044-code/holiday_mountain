import mongoose, { Schema } from "mongoose";

const pricingSchema= new Schema({
    trek_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trek",
        required:true,
    },
    start_date:{
        type:Number,
        required:true,
    

    },
    status:{
        type:String,
        enum:['Available','Fully Booked']
    }
},{timestamps:true})