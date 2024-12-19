import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to place an order and create Stripe session
const placeOrder = async (req, res) => {
     const frontend_url = "https://ezyeats-food-frontend.onrender.com";

     try {
          // Step 1: Calculate total order value dynamically
          const totalOrderValue = req.body.items.reduce((total, item) => {
               return total + item.price * item.quantity;
          }, 0);

          const newOrder = new orderModel({
               userId: req.body.userId,
               items: req.body.items,
               amount: totalOrderValue,
               address: req.body.address,
          });

          await newOrder.save();

          await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

 
          const line_items = req.body.items.map((item) => ({
               price_data: {
                    currency: "inr",
                    product_data: {
                         name: item.name,
                    },
                    unit_amount: item.price * 100,
               },
               quantity:item.quantity
          }));

          if (totalOrderValue < 200) {
               line_items.push({
                    price_data: {
                         currency: "inr",
                         product_data: {
                              name: "Delivery Charges",
                         },
                         unit_amount: 20 * 100,
                    },
                    quantity: 1,
               });
          }

          const session = await stripe.checkout.sessions.create({
               payment_method_types: ["card"],
               line_items: line_items,
               mode: "payment",
               success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
               cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
          });

          res.status(200).json({ success: true, session_url: session.url });

     } catch (error) {
          console.error("Error while placing order:", error.message);
          res.status(500).json({
               success: false,
               message: "Something went wrong while placing the order. Please try again.",
               error: error.message,
          });
     }
};

const verifyOrder = async (req, res) => {
     const {orderId,success} = req.body;
     try{
          if(success=="true") {
               await orderModel.findByIdAndUpdate(orderId,{payment:true});
               res.json({success:true,message: "Paid"});
          }
          else{
               await orderModel.findByIdAndDelete(orderId);
               res.json({success:false,message: "Not Paid"});
          }
     }catch (error){
          console.log(error);
          res.json({success:false,message:"Error"});
     }
}

// user orders for frontend
const userOrders = async (req, res) => {
     try {
          const orders = await orderModel.find({userId:req.body.userId});
          res.json({success:true,data:orders});
     } catch (error) {
          console.log(error);
          res.json({success:false,message:"Error"})        
     }
}

// listing orders for admin panel
const listOrders = async (req, res) => {
     try {
          const orders = await orderModel.find({});
          res.json({success:true,data:orders})
     } catch (error) {
          console.log(error);
          res.json({success:false,message:"Error"})          
     }
}

// api for updating order status
const updateStatus = async (req, res) => {
     try {
          await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
          res.json({success:true,message:"Order status updated"});
     } catch (error) {
          console.log(error);
          res.json({success:false,message:"Error"});
     }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus}