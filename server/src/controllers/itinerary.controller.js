import { Itinerary } from "../models/itinerary.model.js"
import { Trek } from "../models/trek.model.js"



const createItinerary = async (req, res) => {
  try {
    const { trek_id, day_number, title, description } = req.body;

    // Basic validation
    if (!trek_id || !day_number || !title || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Trek existence validation
    const trekExists = await Trek.findById(trek_id);

    if (!trekExists) {
      return res.status(404).json({
        message: "Trek not found"
      });
    }

    // Duplicate day validation
    const trekDay = await Itinerary.findOne({
      trek_id,
      day_number
    });

    if (trekDay) {
      return res.status(400).json({
        message: `Day ${day_number} already exists for this trek`
      });
    }

    // Create itinerary
    const trekItinerary = await Itinerary.create({
      trek_id,
      day_number,
      title,
      description
    });

    return res.status(201).json({
      message: "Itinerary created successfully",
      trekItinerary
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const getItinerary=async(req,res)=>{
   try {
     const {trekId}=req.params
     
      const trekExists = await Trek.findById(trekId);

    if (!trekExists) {
      return res.status(404).json({
        message: "Trek not found"
      });
    }
    const itinerary = await Itinerary.find({ trek_id: trekId }).sort({ day_number: 1 });

    if (!itinerary.length) {
      return res.status(404).json({
        message: "No itinerary found for this trek"
      });
    }

     res.status(200).json({
        message:"Fetched sucessfully",
        itinerary
    })
   } catch (error) {
     res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
   }
}
const updateItinerary=async(req,res)=>{
    try {
        
        
        const itineraryId=req.params.id;
        const {title,description}=req.body

        const itinerary=await Itinerary.findOne({_id:itineraryId})
        if(!itinerary){
            return res.status(400).json({
                message:"No itinerary exists"
            })
        }
        
          // Update only allowed fields
    if (title) itinerary.title = title;

    if (description) itinerary.description = description;

    await itinerary.save();

    return res.status(200).json({
      message: "Itinerary updated successfully",
      itinerary
    });




        
    } catch (error) {
         return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}
const deleteItinerary = async (req, res) => {
  try {

    // Get itinerary ID
    const itineraryId = req.params.id;

    // Find itinerary
    const existingTrek = await Itinerary.findById(itineraryId);

    // Check exists
    if (!existingTrek) {
      return res.status(404).json({
        message: "No itinerary exists"
      });
    }

    // Store values before delete
    const deletedDay = existingTrek.day_number;

    const trekId = existingTrek.trek_id;

    // Delete itinerary
    await Itinerary.findByIdAndDelete(itineraryId);

    // Reorder remaining days
    await Itinerary.updateMany(
      {
        trek_id: trekId,
        day_number: { $gt: deletedDay }
      },
      {
        $inc: { day_number: -1 }
      }
    );

    return res.status(200).json({
      message: "Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });

  }
};
export {createItinerary,getItinerary,updateItinerary,deleteItinerary}