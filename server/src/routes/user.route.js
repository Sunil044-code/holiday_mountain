import {Router} from 'express'
import { deleteUser, getProfile, loginUser, logoutUser, registerUser, updateUser } from '../controllers/user.controller.js';
import {protect} from '../middleware/auth.middleware.js'
const userRouter=Router();


userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",logoutUser)


userRouter.get('/profile',protect,getProfile)
userRouter.patch('/update',protect,updateUser)
userRouter.delete('/delete',protect,deleteUser)


export default userRouter;

