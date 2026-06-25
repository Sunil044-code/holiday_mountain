import { Router } from "express";
import { createItinerary, deleteItinerary, getItinerary, updateItinerary } from "../controllers/itinerary.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.auth.middleware.js";
const itineraryRouter=Router();

itineraryRouter.post('/create',protect,admin,createItinerary)
itineraryRouter.get('/:trekId',getItinerary)
itineraryRouter.patch('/update/:id',protect,admin,updateItinerary)
itineraryRouter.delete('/delete/:id',protect,admin,deleteItinerary)

export default itineraryRouter
