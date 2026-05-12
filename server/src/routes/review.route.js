import { Router } from "express";


const reviewRouter=Router();
reviewRouter.post('/',(req,res)=>{
    res.send("Review Running")
    
})
export default reviewRouter