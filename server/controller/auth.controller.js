import User from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  
  const { username, email, password } = req.body;

  try {
    // Adding validation on all fields
    if (!username || !email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }

    // Checking in db is user already exists 
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError(400, "User with this email already exists"));
    }

    // hashing the password buy enter the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({username, email, password: hashedPassword,});
    await newUser.save();

    // Create JWT token to send client so we can check user 
    const token = jwt.sign({ id: newUser._id },process.env.JWT_SECRET, { expiresIn: "7d"});

    // Remove password before sending response to client
    const { password: pass, ...userData } = newUser._doc;

    // Send token as cookie plus user data as response
    res.cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",})
      .status(201).json({...userData,  message: "User created successfully"});

  } catch (error) {
    console.log("Signup controller error:", error.message);
    return next(new ApiError(500, "Internal Server Error"));
  }
};





/* -------------------------------- LOGIN -------------------------------- */
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Adding validation on all fields
    if (!email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }

    // finding user in db 
      const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(new ApiError(400, "Invalid credentials"));
    }

    // Comparing user password to hashed password store in db
      const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(new ApiError(401, "Incorrect password"));
    }

   // Create JWT token to send client so we can check user 
    const token = jwt.sign({ id: validUser._id },process.env.JWT_SECRET, { expiresIn: "7d" });

    // Remove password before sending response to client
    const { password: pass, ...userData } = validUser._doc;

    // Send token as cookie plus user data as response
    res.cookie("access_token", token, { httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }).status(200).json(userData);

  } catch (error) {
    console.log("Login controller error:", error.message);
    return next(new ApiError(500, "Internal Server Error"));
  }
};



/* ------------------------------- signOut ------------------------------ */
export const signOut = async (_, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    return next(new ApiError(401, "Internal server error failed to signOut"));
  }
};



/* ------------------------------- Profile ------------------------------ */
export const profile = async (req, res, next) => {
  try {
    // accpting user info buy using from verfitoken decoded info
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};
