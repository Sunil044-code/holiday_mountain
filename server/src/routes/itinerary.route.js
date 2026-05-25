import { Router } from "express";
import { createItinerary, deleteItinerary, getItinerary, updateItinerary } from "../controllers/itinerary.controller.js";


const itineraryRouter=Router();

itineraryRouter.post('/create', createItinerary)
itineraryRouter.get('/:trekId', getItinerary)
itineraryRouter.patch('/update/:id',updateItinerary)
itineraryRouter.delete('/delete/:id',deleteItinerary)

export default itineraryRouter
