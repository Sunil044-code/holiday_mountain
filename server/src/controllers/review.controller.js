import { Review } from "../models/review.model.js";
import { Trek } from "../models/trek.model.js";

const createReview=async(req,res)=>{
   try {
     const {trek_id,comment,rating}=req.body;

       //validaitons 
   if(!rating || !trek_id || !comment ){
        res.status(400).json({
            message:"All fields are required"
        })

    }

    const existingTrek= await Trek.findById(trek_id)
    if(!existingTrek){
        return res.status(400).json({
            message:"There is no Trek"
        })
    }

    //Duplicate Reviews
    const existingReview= await Review.findOne({
        id:req.user_.id,
        trek_id:trek_id
        })

    if (existingReview){
        return res.status(400).json({
            message:"You have already reviewed this trek"
        })
    }
    const reviewCreate= await Review.create({
        user_id:req.user_.id,
        trek_id,
        comment,
        rating,
    })
    return res.status(201).json({
        message:"Review Created Sucessfully",
        reviewCreate
    })

   } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
   }
}

const updateReview=async(req,res)=>{
    try {
           const {rating,comment}=req.body
    const reviewId=req.params.id


    const existingReview=await Review.findById(reviewId);
    if(!existingReview){
        return res.status(400).json({
            message:"There is no Review "
        })
    }

    //OwnerValidation
    if(existingReview.user_id.toString() !== req.user._id.toString()){
        return res.status(400).json({
            message:"Not Authorized to review"
        })
    }

    //Updating Fields
    const review=await Review.findByIdAndUpdate(reviewId
        ,
        {
            rating,
            comment
        },{new:true,runValidators:true})


    res.status(200).json({
        message:"updated sucesfully",
        review
    })
    } catch (error) {
        return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
};


const deleteReview=async(req,res)=>{
    

    try {
        const reviewId= req.params.id

        const existingReview= await Review.findById(reviewId)
        if(!existingReview){
            return res.status(400).json({
                message:"The review Doesnt Exists"
            })
        }

        if(existingReview.user_id.toString() !== req.user._id.toString()){

            return res.status(403).json(
        {
            message:"The User is not authorized to delete "
        })
        }
            
        
        const deletedReview= await Review.findByIdAndDelete(reviewId)
        res.status(200).json(
            {
                message:'Deleted sucessfully'
            }
        )
    } catch (error) {
          return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    
    }
}

const getReview=async(req,res)=>{

    try {
        const {trekId}=req.params;
        
        const reviews= await Review.find({
            trek_id:trekId
        }).populate("user_id","userName email").sort({createdAt:-1})


        if(reviews.length==0){
            return res.status(400).json({
                message:"There are no reviews!!"
            })
        }
        res.status(200).json({
            message:"Reviwes fetched Sucessfully",
            Total_reviews:reviews.length,
            reviews
        })
        
    } catch (error) {
          return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    
    }
}
export {createReview,updateReview,getReview,deleteReview}