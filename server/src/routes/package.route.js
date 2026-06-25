import { Router } from "express";
import { createPackage, deletePackage, getPackagesByTrek, updatePackage } from "../controllers/package.controller.js";
import { admin } from "../middleware/admin.auth.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
const packageRouter=Router();

packageRouter.post('/create/:trekId',protect,admin,createPackage)
packageRouter.patch('/update/:packageId',protect,admin,updatePackage)
packageRouter.get('/:trekId',getPackagesByTrek)
packageRouter.delete('/delete/:packageId',protect,admin,deletePackage)

export default packageRouter;