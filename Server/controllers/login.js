import jwt from 'jsonwebtoken';
import users from '../models/user.js'
import bcrypt from 'bcrypt'
export const login=async(req,res)=>{
    const {name,password}=req.body
    try{
        const existingUser=await users.findOne({name})
        
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
          }
          
        const isPasswordvalid=await bcrypt.compare(password, existingUser.password)

        if(!isPasswordvalid)
        {
         return   res.status(401).json({message:"Invalid credentials"})
        }

        const token=jwt.sign({email:existingUser.email, id:existingUser._id}, process.env.JWT_SECRET,{expiresIn:'1h'})

        res.status(200).json({result:existingUser,token})
    }
    catch(error){
       return res.status(500).json({message:"Server error", error:error.message})
    }
}

