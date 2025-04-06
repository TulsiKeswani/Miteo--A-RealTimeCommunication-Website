import dotenv from "dotenv";

if(process.env.NODE_ENV != "production"){
  let result = dotenv.config();
  
}

import { User } from "../models/user_model.js";
import { Meeting } from "../models/meetings_model.js";
import httpStatus from "http-status";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const register = async (req,res) => {
    const {name , username, password} = req.body;
    try {
       
        const user = await User.findOne({username});
        if(user){
           return res.status(httpStatus.FOUND).json({message : "User already register"})
        } 
        const hashpassword = await argon2.hash(password);
        const newuser = new User({
            name : name,
            username : username,
            password : hashpassword
        })

        await newuser.save();
        return res.status(httpStatus.CREATED).json({message : "User Created Successfully"});
    } catch (error) {
            res.json({message : `some error occured ${error}`});
    }
    
}

// tokem generation function -->




function generateToken(user) {
    const key = process.env.SECRET_KEY;
    const payload = { id : user._id,username : user.username};
    return jwt.sign(payload, key , { expiresIn: "7d" }); // 1 week validity
}

const login = async (req,res) => {
    
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message : "username or password something not provide"});
    }
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message : "User Not Found"});
        }

        if(await argon2.verify(user.password, password)){
            const token = generateToken(user);
            console.log("Genrated token => ", token);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, // Use HTTPS in production
                sameSite: "None",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
                
            });
            return res.status(httpStatus.OK).json({ message: "Login Successful", token });
        }
        else{
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid password" });
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Some error occurred: ${error.message}` });
    }
}

const checkCookie = async (req,res) => {
    const token = req.cookies.token;
    if(token){
        return res.json({success:true});
    } else {
        res.json({success:false});
    }
}

const logout = (req, res) => {
    console.log("hello")
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0), // Set cookie expiry to past time
    });
    res.json({ success: true, message: "Logged out successfully" });
};
const getAllActivities = async(req,res) => {
    

    try {
        const token  = req.cookies.token;
        if(!token){
            return res.status(httpStatus.UNAUTHORIZED).json({message : "Unautherized"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }
       
        const meeting = await Meeting.find({user_id : user.username});
       
        return res.json(meeting);
    } catch (error) {
        console.log(error);
        res.json({message : `something Went Wrong ${error} `})
    }
}

const addToActivites = async(req,res) => {
    const token = req.cookies.token;
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const {meeting_code} = req.body;

    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message : "USER NOT FOUND"});
        }

        const newMeeting = new Meeting({
            user_id : user.username,
            meeting_code : meeting_code
        });

        await newMeeting.save();
        res.status(httpStatus.CREATED).json({message : "Meeting Added In History"});
    } catch (error) {
        res.json({message : `Some Error occured ${error}`});
    }
    
}


export {login,register,checkCookie,logout,addToActivites,getAllActivities};