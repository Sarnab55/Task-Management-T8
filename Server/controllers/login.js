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

export const checkemail = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        res.status(200).json({ message: "User exists and can change password", email: existingUser.email });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const changepassword = async (req, res) =>{
    const {email, password , confirmpassword} = req.body;

    try {
        // Check if user exists
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user's password
        existingUser.password = hashedPassword;
        await existingUser.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

