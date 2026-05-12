import {Router} from 'express'
import { deleteUser, getProfile, loginUser, logoutUser, registerUser, updateUser } from '../controllers/user.controller.js';

const userRouter=Router();


userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",logoutUser)
userRouter.get('/profile/:id',getProfile)
userRouter.patch('/update/:id',updateUser)
userRouter.delete('/delete/:id',deleteUser)


export default userRouter;

