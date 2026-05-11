import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
const registerUser=async(req,res)=>{
    try {
        const {userName,email,password,phone,role}=req.body;

        //basic validation
        if(!userName || !email || !password){           
            return res.status(400).json({message:"All fields are required!!"})
        }

        //checking if already registered
        const existingUser = await User.findOne({email:email.toLowerCase()})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

       //creating a User
       const user=await User.create({
        userName,
        email,
        password,
        phone,
        role,
        loggedIn:false
       })
       res.status(201).json({
        message:"User registered sucessfully",
        user:{id:user._id,email:user.email,username:user.userName,phone:user.phone,role:user.role}
    
    })
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message})
        
    }

}
const loginUser=async(req,res)=>{

   try {
     //Find existing User
     const{email,password}=req.body
 
     const user=await User.findOne({email})
 
     //doesnot exist
     if(!user){
         return res.status(400).json({message:"User Not Found"})
     }
     //compare password
     const isMatch=await user.comparePassword(password);
     if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"}) 
     }
     res.status(200).json({
        message:"User Logged In",
        user:{
            id:user._id,
            email:user.email,
            username:user.username,
            role:user.role,


            
        }
     })
   } catch (error) {

    return res.status(500).json({message:"Internal Server Error",error:error})
    
   }
}
const logoutUser=async(req,res)=>{
    try {
        const {email}=req.body;

    const user= await User.findOne({
        email
    });
    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }
    res.status(200).json({message:"Logged Out Successfully"})
    } catch (error) {
     res.status(500).json({message:"Internal Server Error",error})
    }

}

export {registerUser,loginUser,logoutUser}