import jwt from 'jsonwebtoken';
import users from '../models/user.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await users.findOne({ name });

    if (!existingUser) {
      console.log("User not found:", name);
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", name);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Login successful for user:", name);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
