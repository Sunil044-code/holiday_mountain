import { Router } from "express";
import { deleteGuide, generateGuide, getAllGuides, getGuide, updateGuide } from "../controllers/guide.controller.js";


const guideRouter= Router()

guideRouter.post('/createguide',generateGuide)
guideRouter.get('/getGuide/:guideId',getGuide)
guideRouter.get('/allGuides',getAllGuides)
guideRouter.patch('/update/:id',updateGuide)
guideRouter.delete('/deleteGuide/:guideId',deleteGuide)
export default guideRouter;