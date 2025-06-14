import express from "express"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 2000
const app = express()
import mongoose from "mongoose"
import User from "./routes/Users.js"


mongoose.connect(process.env.MONGOURI)
.then(()=>{
    console.log("Db connected thanks to Mr Prateek")
})
.catch(()=>{
    console.log("db disconnected bc riya ki maa ki 1008 baar")
})
app.use(express.json())
app.use("/api",User)
app.get("/",(req,res)=>{
    console.log("arpita")
    res.send("Trivedi")
})










app.listen(PORT,()=>console.log(`Server is starting at Port ${PORT}`))