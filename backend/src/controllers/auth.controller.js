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


// User Login
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
        return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};