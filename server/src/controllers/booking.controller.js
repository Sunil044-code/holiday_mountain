import { Booking } from "../models/booking.model.js"
import { TrekPackage } from "../models/package.model.js"
import { Trek } from "../models/trek.model.js"


const createBooking=async(req,res)=>{
    try {
        const {
            trek_id,
            package_id,
            total_participant,
            start_date
        }=req.body

        if(
            !trek_id || !package_id || !total_participant || !start_date
        ){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        
        const trek =await Trek.findById(trek_id)

        if(!trek){
            return res.status(400).json({
                message:"No Trek exists"
            })
        }
        const packageData = await TrekPackage.findById(package_id)

        if(!packageData){
            return res.status(400).json({
                message:"No Package found"
            })
        }
        const total_price = packageData.price * total_participant;

        const booking = await Booking.create({
          user_id: req.user._id,
          trek_id,
          package_id,
          total_participant,
          start_date,
          price: total_price
        });
        return res.status(202).json({
            message:"Booking Created Sucessfully"
        })

    } catch (error) {
         return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

const readMyBookings=async(req,res)=>{
  try {
    const booking=await Booking.find({
        user_id:req.user._id
    }).populate('trek_id').populate('package_id');
    

    res.status(200).json({
      message: "Bookings fetched successfully",
      total_bookings: booking.length,
      booking
    })


  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }


}

const getBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking =
      await Booking.findById(bookingId)
        .populate("trek_id")
        .populate("package_id");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (
      booking.user_id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    return res.status(200).json({
      booking
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking =
      await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (
      booking.user_id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    return res.status(200).json({
      message: "Booking cancelled"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
const getAllBookings = async (req, res) => {
  try {

    const bookings =
      await Booking.find()
        .populate("user_id")
        .populate("trek_id")
        .populate("package_id");

    return res.status(200).json({
      totalBookings: bookings.length,
      bookings
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
export {createBooking,readMyBookings,getBooking,cancelBooking,getAllBookings}