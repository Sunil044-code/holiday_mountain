import mongoose, { Schema } from "mongoose";

const reviewSchema=new Schema({
   user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
   },
   trek_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Trek",
    required:true
   },
    rating:{
        type:Number,
        minLength:1,
        maxLength:5
    },
    comment:{
        type:String,
    }
},{timestamps:true})

export const Review=mongoose.model("Review",reviewSchema)