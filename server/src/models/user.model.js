import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema=new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        maxLength:15

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        
    },
    phone:{
        type:String,
        
    },
    role:{
    type:String,
    enum:['user','admin'],
    default:'user'       
    }
    
},{timestamps:true})

//before saving it we need to hash the password

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

});

//compare the passwords
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
export const User=mongoose.model("User",userSchema)