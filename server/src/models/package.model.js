import mongoose, { Schema } from "mongoose";

const packageSchema= new Schema({

    trek_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Trek',
        required:true,
    },
    package_name:{
        type:String,
        required:true,


    },
    package_type:{
      type:String,
      enum:['Basic','Standard','Premium'] ,
      required:true
    },
    price:{
        type:Number,
        required:true,
    },
    group_size:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['Available','Fully Booked'],
        default:"Available"

    },
    includedTransport:{
        type:Boolean,
        default:false
    },
    includedMeal:{
        type:Boolean,
        default:false,

    },
    includedAccomodation:{
        type:Boolean,
        default:false
    }
});


export const TrekPackage= mongoose.model("TrekPackage",packageSchema);