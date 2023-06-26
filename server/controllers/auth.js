import User from "../models/User.js"
import { createError } from "../utils/error.js";

import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const { email } = req.body;
        const verificationToken = uuidv4();

        const newUser = new User({
            // username: req.body.username,
            // email: req.body.email,
            ...req.body,
            password: hash,
            verificationToken,
        })

        await newUser.save()

        // Configure Nodemailer for sending emails
        const transporter = nodemailer.createTransport({
            // Add your email provider configuration here
            service: 'gmail',
            auth: {
                user: process.env.myEmail,
                pass: process.env.myPassword,
            },
        });

        // Send the verification email
        const PORT = process.env.PORT
        const verificationLink = `http://localhost:${PORT}/server/auth/verify-email/${verificationToken}`;
        const mailOptions = {
            from: 'luuvanhuuphuoc@gmail.com',
            to: email,
            subject: 'Verify your email',
            text: `Click the following link to verify your email: ${verificationLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send("User has been created")
        res.status(200).json({ message: 'Registration successful' })
    } catch(err){
        next(err)
        // res.status(500).json({ message: 'Internal server error' });
    }
}

export const verifyEmail = async(req, res, next) => {
    try{
        const { token } = req.params;
        
        // Find the user with the provided verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: 'Invalid verification token' });
        }
      
        // Update the user's verification status
            user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch(err){
        next(err)
        // res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async(req, res, next) => {
    try{
        const user = await User.findOne({
            username: req.body.username
        })
        if(!user) 
            return next(createError(404, "Tên tài khoản không tồn tại")) 
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) 
            return next(createError(404, "Sai thông tin tài khoản hoặc mật khẩu")) 
        if(user.isVerified == false) 
            return next(createError(404, "Tài khoản chưa được xác nhận")) 
        // Token
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT)
        
        // Hide security and unnecessary things
        const {password, isAdmin, isActive, ...otherDetails} = user._doc;
        
        res.cookie("access_token", token,{
            httpOnly: true,
        })
        .status(200)
        .json({ details: {...otherDetails}, isAdmin})
        // res.status(200).json({...otherDetails})
    } catch(err){
        next(err)
    }
}

export const logout = async(req, res, next) => {

    try {
        
        if (req.headers && req.headers.authorization) { 
            const token= req.headers.authorization.split(' ')[1]    
            if(!token) {
                return res.status (401).json({success: false, message: 'Authorization fail!'})
            }
            const tokens = req.user.tokens;
            const newTokens = tokens.filter(t => t == token)
            await User.findByIdAndUpdate(req.user._id, {tokens: newTokens})
            res.json({
                success: true,
                message: "Sign out successfully"
            })
        }
    } catch (err){
        next(err)
    }
}