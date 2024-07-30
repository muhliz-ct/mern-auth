import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'


export const signup =async (req,res)=>{
    const {username ,email ,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username, email, password:hashedPassword});
    try {
        await newUser.save();
        res.send("added to db successfully")
    } catch (error) {
        res.send("user already exist or some error")
    }
    
};