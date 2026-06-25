import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";

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
        // const token= generateToken(user._id)

       //creating a User
       const user=await User.create({
        userName,
        email,
        password,
        phone,
        role:"user",
        loggedIn:false
       })
       res.status(201).json({
        message:"User registered sucessfully",
        // token,
        user:{
            id:user._id,
            email:user.email,
            username:user.userName,
            phone:user.phone,
            role:user.role
        }
    
    })
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
        
    }

}
const loginUser=async(req,res)=>{

   try {
     //Find existing User
     const{email,password}=req.body
 
     const user=await User.findOne({email}).select('+password')
 
     //doesnot exist
     if(!user){
         return res.status(400).json({message:"User Not Found"})
     }
     //compare password
     const isMatch=await user.comparePassword(password);
     if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"}) 
     }
     const token=generateToken(user._id)
     res.status(200).json({
        message:"User Logged In",
        token,
        user:{
            id:user._id,
            email:user.email,
          username:user.userName,
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
const getProfile = async (req, res) => {
  try {


    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
const updateUser=async(req,res)=>{
   try {
    
   const {email,phone,userName}=req.body

   const user=await User.findByIdAndUpdate(req.user._id,
    {
        userName,
        email,
        phone,
    },{new:true,runValidators:true})

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user:user
    });

    
   } catch (error) {
      res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
   }

const deleteUser=async(req,res)=>{
    try {
        
        
        const user=await User.findByIdAndDelete(req.user._id);
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        return res.status(200).json({message:"User Deleted Sucessfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}

export {registerUser,loginUser,logoutUser,deleteUser,updateUser,getProfile}