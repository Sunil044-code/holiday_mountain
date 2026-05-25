import { Router } from "express";
import { createReview, deleteReview, getReview, updateReview } from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const reviewRouter=Router();
reviewRouter.post('/',(req,res)=>{
    res.send("Review Running")
    
})

reviewRouter.post('/create',protect,createReview)
reviewRouter.patch('/upadte/:id',protect,updateReview)
reviewRouter.delete('/delete/:id',protect,deleteReview)
reviewRouter.post('/:trekId',getReview)
export default reviewRouter