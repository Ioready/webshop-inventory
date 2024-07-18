import express from "express";
import multer from "multer";
import { user } from "../controllers/userController.js";
import { products } from "../controllers/productController.js";
import { auth } from "../middlewares/auth.js";

const upload = multer({ dest: 'uploads/' });

const { userLogin,webshopLogin,webshopRegister } = user;
const { createProduct, getProducts, editProduct, setStores,setCsvData, deleteProduct, csvFileUpload, getAllProduct,markWebshopProduct } = products;
const { verifyToken } = auth
const userRout = express.Router();

userRout.post("/webshopLogin", webshopLogin);
userRout.post("/webshopRegister", webshopRegister);
userRout.post("/login", userLogin);
userRout.post("/products", verifyToken , createProduct);
userRout.post("/products/import", verifyToken , upload.single('file'), csvFileUpload);
userRout.get("/products", verifyToken , getProducts);
userRout.get("/allproduct", verifyToken , getAllProduct);
userRout.patch("/products/undefined", verifyToken , editProduct);
userRout.patch("/products/:id", verifyToken , setStores);
userRout.patch("/products/csv/undefined", verifyToken , setCsvData);
userRout.post("/products/:id", verifyToken , deleteProduct);
userRout.patch("/products/update-webshop-status/undefined", verifyToken , markWebshopProduct);

export default userRout;
