import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requiured:true
    },
    trek_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trek",
        required:true
    
    },
    package_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TrekPackage",
        required:true
    },
    total_participant:{
        type:Number,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:[
            'Pending',
            'Confirmed',
            'Cancelled',
            'Completed'
        ],
        default:'Pending'
    },
    discount:{
        type:Number
    },
    price:{
        type:Number,
        required:true
    }
    



},{timestamps:true})

export const Booking = mongoose.model(
  "Booking",
  bookingSchema
);