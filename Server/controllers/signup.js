import jwt from 'jsonwebtoken';
import users from '../models/user.js'
import bcrypt from 'bcrypt'
export const signUp=async(req,res)=>{
    const {name,password,email}=req.body
    try{
        const existingUser=await users.findOne({email})
        if(existingUser)
        {
          return  res.status(404).json({message:"User exists"})
        }

        const hashedPassword=await bcrypt.hash(password,12)
        const newUser=await users.create({name,email,password:hashedPassword})

        const token=jwt.sign({email:newUser.email, id:newUser._id,name:newUser.name}, process.env.JWT_SECRET,{expiresIn:'1h'})

        res.status(200).json({result:newUser,token})
    }
    catch(error){
        console.error(error);
     return   res.status(500).json({message:"Server error", error:error.message})
    }
}

