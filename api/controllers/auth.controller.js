import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup =async (req,res,next)=>{
    const {username ,email ,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username, email, password:hashedPassword});
    try {
        await newUser.save();
        res.send("added to db successfully")
    } catch (error) {
        console.log(error.message);
        next(errorHandler(300,"hahahaha"));
    }
    
};

export const signin = async (req ,res ,next)=>{
    const {email, password} = req.body;
    try {
        const validUser =await User.findOne({email});
        console.log(validUser);
        if(!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Invalid credentials!'));
        const token = jwt.sign({ id: validUser}, process.env.JWT_SECRET);
        const {password: hashedPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.findOne({email: req.body.email})
        if(user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const {password: hashedPassword,rest} = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random()* 10000).toString(), email: req.body.email, password: hashedPassword, profilePicture: req.body.photo});
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const {password: hashedPassword2, ...rest} = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
        }
    } catch (error) {
        next(error)
    }
}


export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success');
};


export const userData = async ( req, res, next)=>{
    try {
        const data = await User.find();
        console.log(data);
        res.status(200).json(data); 
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteUser = async (req, res, next)=>{
    try {
        console.log(req.params.id);
        await User.findOneAndDelete({_id:req.params.id});
        res.send({success:true})
    } catch (error) {
        next(error)
    }

}