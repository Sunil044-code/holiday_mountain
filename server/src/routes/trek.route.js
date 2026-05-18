import { Router } from "express";
import { createTrek, deleteTrek, getAllTreks, getOneTrek, updateTrek } from "../controllers/trek.controller.js";

 
 
 const trekRouter=Router();


trekRouter.get("/",getAllTreks)
trekRouter.get("/:slug",getOneTrek)

 //Admin 
 trekRouter.patch("/updateTrek/:id",updateTrek)
 trekRouter.delete("/deleteTrek/:id",deleteTrek)
 trekRouter.post("/create",createTrek)

 export default trekRouter;