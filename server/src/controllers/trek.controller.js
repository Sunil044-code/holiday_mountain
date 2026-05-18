import { Trek } from "../models/trek.model.js";


const createTrek=async(req,res)=>{
    //only admin
 try {
const {title,slug,region,total_distance,altitude,estimated_duration,image}=req.body;
    // //checking the duplication occurs
    // const existingTrek=await Trek.findOne({title:title})
    // if(existingUser){
    //     return res.status(400).json({
    //         message:"Already exists"
    //     })
    // }
    if(
        
        !title || !slug || !region || !estimated_duration|| !total_distance || !altitude || !image){
        return res.status(400).json({
            message:"The above fields are required "
        })

    }

    //creating a trek
    const trek = await Trek.create({
        title,
        slug,
        region,
        total_distance,
        altitude,
        estimated_duration,
        image
    })
    
    res.status(201).json({
        message:"Trek Created Sucessfully",
        trek:{
            id:trek._id,
            title:trek.title,
            region:trek.region,
            total_distance:trek.total_distance,
            altitude:trek.altitude,
            estimated_duration:trek.estimated_duration,
            image:trek.image

        }
    })
 } catch (error) {
     res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
        
 }
}


const getAllTreks=async(req,res)=>{

    try {
        
    const treks =await Trek.find();
    res.status(200).json({
        message:"Fetched sucessfully",
        total:treks.length,
        treks
        
    })

    } catch (error) {
         res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    
    }

    

}
const getOneTrek=async(req,res)=>{
    try {
        const {slug}=req.params;
        console.log("Requested slug:", slug);
        
        const trek =await Trek.findOne({slug});
        
        if(!trek){
            return res.status(400).json({
                message:"No treks found"
            })}
            res.status(200).json({
                message:"Fetched Sucessfully",
                trek
            })
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    
    }
}
const deleteTrek=async(req,res)=>{
    try {
        const trekId=req.params.id 

    const deletedTrek=await Trek.findOneAndDelete(trekId)
    if(!deletedTrek){
        return res.status(400).json({
            message:"Trek is not found"
        })
    }
    res.status(200).json({
        message:"Trek deleted Sucessfully"
    })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }

}
const updateTrek=async(req,res)=>{

    try {
         const trekId=req.params.id;

    const updatedTrek=await Trek.findByIdAndUpdate(trekId,req.body,{
        new:true,runValidators:true
    })
     if (!updatedTrek) {
      return res.status(404).json({
        message: "Trek not found"
      });
    }

    return res.status(200).json({
      message: "Trek updated successfully",
      trek: updatedTrek
    });

    } catch (error) {
         res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
   

    
}
export {createTrek,getAllTreks,getOneTrek,updateTrek,deleteTrek}