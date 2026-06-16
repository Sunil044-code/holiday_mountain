//Creating Guide

import { Guide } from "../models/guide.model.js";

const generateGuide=async(req,res)=>{
    try {
        const {name,certification,experience_years,languages,specializaton,email,profile_image,bio,is_active}=req.body;

        //Basic Validation
        if(!name || !certification || !experience_years || !languages || !specialization || !email || !profile_image){
            return res.status(400).json({
                message:"All fields are required !"
            })
        }
        const guideExists= await Guide.findOne({email:email.toLowerCase()})
        if(guideExists){
            return res.status(400).json({
                message:"User Already exists"
            })
        }
        //create Guide 
        const guide = await Guide.create({
             name,
            certification,
            experience_years,
            languages,
            specializaton,
            email,
            profile_image,
            bio,
            is_active

        })

    
        res.status(201).json({
            message:"Guide Created Sucessfully",
            guide


        })
    } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
    
}


const getAllGuides=async(req,res)=>{
    try {
        const allGuides= await Guide.find();
         return res.status(200).json({
      message: "Guides fetched successfully",
      total: allGuides.length,
      guides: allGuides
    });
    } catch (error) {
        return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

const getGuide=async(req,res)=>{
 try {
       const{guideId}=req.params;
    
    const guideProfile=await Guide.findById(guideId)

    if(!guideProfile){
        res.status(404).json({
            messag:"Guide doesnot Exists"
        })

    }

    res.status(200).json({
        message:"Fetched Successfully",
        guideProfile,
    })
 } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
 }
}

const updateGuide=async(req,res)=>{
    try {
        const {guideId}=req.params
    const {name,certification,experience_years,languages,specializaton,email,profile_image,bio,is_active}=req.body;

    const updateGuide=await Guide.findByIdAndUpdate(guideId,{
        name,
            certification,
            experience_years,
            languages,
            specializaton,
            email,
            profile_image,
            bio,
            is_active

    },{new:true,runValidators:true});

    res.status(200).json({
        message:"Guide Updated Sucessfully",
        updateGuide
    })
    
    } catch (error) {
        return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

const deleteGuide=async(req,res)=>{
    try {
    const{guideId}=req.params;
    const guide= await Guide.findById(guideId)
    if(!guide){
        res.status(404).json({
            message:"Guide doesnot Exists"
        })
    }
    const guideToDelete= await Guide.findByIdAndDelete(guideId)

    
    res.status(200).json({
        message:"The Guide Profile deleted Sucessfully"
    })
    } catch (error) {
        return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

export {generateGuide,getGuide,getAllGuides,updateGuide,deleteGuide}