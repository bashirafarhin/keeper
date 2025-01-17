import UserModel from "../Database/models/user.model.js";
import { validationResult } from "express-validator";
import BlacklistTokenModel from "../Database/models/blacklistToken.model.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ //return error one by one until array is empty that is no error
        return res.status(400).json({ message : errors.array()[0].msg });
    }
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) { return res.status(400).json({ message: 'User already registered' }); }
        const hashedPassword = await UserModel.hashPassword(password);
        const user = await UserModel.create({
            email,
            password: hashedPassword
        });
        const token = user.generateAuthToken();
        return res.status(200).json({ token, user });
    } catch (err) {
        return res.status(500).json({ error : "Internal Server Error" });
    }
}

export const loginUser = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ message : errors.array()[0].msg });
    }
    const { email, password} = req.body;
    const user = await UserModel.findOne({ email}).select('+password'); //here +password is used to select the password as we have set select : false in the model
    if(!user){
        return res.status(400).json({ message : "User not registered"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){ return res.status(400).json({ message : "Invalid password"}); }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user});
};


export const registerUsingGoogle = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ message : errors.array()[0].msg });
    }
    const { email }= req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) { return res.status(400).json({ message: 'User already registered' }); }
        const user = await UserModel.create({
            email,
            password: process.env.GOOGLE_DEFAULT_PASSWORD
        });
        const token = user.generateAuthToken();
        res.status(200).json({ token, user });      
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginUsingGoogle = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ message : errors.array()[0].msg });
    }
    const { email } = req.body;
    const user = await UserModel.findOne({ email});
    if(!user){
        return res.status(400).json({ message : "User not registered"});
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user});
};


export const logoutUser = async(req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    res.clearCookie('token');
    await BlacklistTokenModel.create({ token });
    return res.status(200).json({ message : "Logged Out Successfully"});
}

export const deleteUserAccount = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await BlacklistTokenModel.create({ token });
        await UserModel.findByIdAndDelete({_id : req.user._id });
        return res.status(200).json({ message: 'Account Deleted Successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error during deleting account' });
    }
};