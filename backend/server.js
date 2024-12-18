import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app configuration settings
const app = express()
const port = 4000;

// middleware configuration
app.use(express.json()) // front -> back
app.use(cors()) // back -> front

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
     res.send("API Working")
})

app.listen(port,()=>{
     console.log(`Server Started at http://localhost:${port}`)
})
