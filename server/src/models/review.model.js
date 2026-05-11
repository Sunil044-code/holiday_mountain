import mongoose, { Schema } from "mongoose";

const reviewSchema=new Schema({
    title:{
        type:String,
    },
    rating:{
        type:Number,
        minLength:1,
        maxLength:5
    },
    comments:{
        type:String,
    }
},{timestamps:true})

export const Review=mongoose.model("Review",reviewSchema)