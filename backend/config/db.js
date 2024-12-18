import mongoose from "mongoose";

export const connectDB = async () => {
     await mongoose.connect('mongodb+srv://Aarin:Aarin123@cluster0.8j3bd.mongodb.net/ezyeats').then(()=>console.log("DB Connected"));
}