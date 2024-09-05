import express from "express";
import { cart } from "../controllers/cartController.js";
import { auth } from "../middlewares/auth.js";

const { verifyToken } = auth

const { addToCart,removeFromCart,updateCartQuantity,getCartItems,createOrder,getOrder,deleteOrder } = cart;
const cartRout = express.Router();

cartRout.post("/",verifyToken, addToCart);
cartRout.delete("/removeFromCart",verifyToken, removeFromCart);
cartRout.put("/updateCartQuantity",verifyToken, updateCartQuantity);
cartRout.get("/getCartItems",verifyToken, getCartItems);
cartRout.post("/createOrder",verifyToken, createOrder);
cartRout.get("/getOrder",verifyToken, getOrder);
cartRout.post('/deleteOrder/:id',verifyToken, deleteOrder);
export default cartRout;
