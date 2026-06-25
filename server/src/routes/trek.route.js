import { Router } from "express";
import { createTrek, deleteTrek, getAllTreks, getOneTrek, updateTrek } from "../controllers/trek.controller.js";
import { admin } from "../middleware/admin.auth.middleware.js";
 import { protect } from "../middleware/auth.middleware.js";
 
 const trekRouter=Router();


trekRouter.get("/",getAllTreks)
trekRouter.get("/:slug",getOneTrek)

 //Admin 
 trekRouter.patch("/updateTrek/:id",protect,admin,updateTrek)
 trekRouter.delete("/deleteTrek/:id",protect,admin,deleteTrek)
 trekRouter.post("/create",protect,admin,createTrek)

 export default trekRouter;