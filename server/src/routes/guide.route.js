import { Router } from "express";
import { deleteGuide, generateGuide, getAllGuides, getGuide, updateGuide } from "../controllers/guide.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.auth.middleware.js";
const guideRouter= Router()

guideRouter.post('/createguide',protect,admin,generateGuide)
guideRouter.get('/getGuide/:guideId',getGuide)
guideRouter.get('/allGuides',getAllGuides)
guideRouter.patch('/update/:id',protect,admin,updateGuide)
guideRouter.delete('/deleteGuide/:guideId',protect,admin,deleteGuide)
export default guideRouter;