import express from "express"
const router = express.Router()
import Users from "../models/Users.js"



router.post("/signup",async(req,res)=>{
    const {FullName,Email,Mobile,Password} = req.body
    if(!FullName || !Email || !Mobile || !Password){
        res.status(300).json({message:"All fields are required",error})
    }
    try{
            const isUser = await Users.findOne({Email})
            if(isUser){
                res.status(203).json({message:"User already exists with this email"})
            }
            const newUser = await Users.create({
                FullName,
                Email,
                Mobile,
                Password:Users.Password
            })
            res.status(200).json({message:"User Created Successfully",NewUser:newUser})
            console.log(newUser)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",error})
    }
})




export default router