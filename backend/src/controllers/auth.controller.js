import {userModel} from "../models/user.model.js";
import bcrypt from "bcryptjs";



export const registerContoller = async (req, res) => {



const { username, email, password } = req.body;

const user = await userModel.findOne({email:email})
if(user){
    return res.status(409).send({
        success: false,
        message: "User already exists"
    })
 
}
   const passwordHash = await bcrypt.hash(password, 10);
   const newUser = await userModel.create({
        username,
        email,
        passwordHash:passwordHash
    })

res.status(201).json({
    message: "User registered successfully",
    success: true,
    username:newUser.username,
    email:newUser.email,
    
})

}