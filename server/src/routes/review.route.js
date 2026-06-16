import { Router } from "express";
import { createReview, deleteReview, getReview, updateReview } from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const reviewRouter=Router();
reviewRouter.post('/',(req,res)=>{
    res.send("Review Running")
    
})

reviewRouter.post('/create',createReview)
reviewRouter.patch('/upadte/:id',updateReview)
reviewRouter.delete('/delete/:id',deleteReview)
reviewRouter.post('/:trekId',getReview)
export default reviewRouter