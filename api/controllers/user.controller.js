import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';

const test = async (req,res)=>{
    try {
        res.send("again its working !!!")
    } catch (error) {
       console.error(error); 
    }
}

export const getUser=async(req,res)=>{
   const data= await User.findOne({_id:req.params.id});
   res.send(data)
}


export const updateUser = async (req, res, next) => {
    console.log(req.body);
    console.log(req.user.id._id , req.params.id);
    if(!req.body.admin&&(req.user.id._id !== req.params.id)){
        
        return next(errorHandler(401, 'You can only update your account'));
    }

    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            }
        },
        {new: true}
    );
    // console.log(updatedUser);
    const {password, ...rest} = updatedUser._doc;
    // console.log(rest);
    res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req,res,next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can delete only your own account!'))
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...')
    } catch (error) {
        next(error)
    }
}


export {
    test,

}