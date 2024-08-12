import express from "express";
import multer from "multer";
import { user } from "../controllers/userController.js";
import { products } from "../controllers/productController.js";
import { auth } from "../middlewares/auth.js";
import { cms } from "../controllers/cmsController.js";

const upload = multer({ dest: 'uploads/' });

const {addCms,getCms,editCms} = cms;
const { userLogin,webshopLogin,webshopRegister } = user;
const { createProduct, getProducts, editProduct, setStores,setCsvData, deleteProduct, csvFileUpload, getAllProduct,markWebshopProduct,addCategory,getCategory} = products;
const { verifyToken } = auth
const userRout = express.Router();

userRout.post("/addCms", addCms);
userRout.get("/getCms", getCms);
userRout.patch("/editCms",editCms);
userRout.post("/addCategory", addCategory);
userRout.get("/getCategory", getCategory);
userRout.post("/webshopLogin", webshopLogin);
userRout.post("/webshopRegister", webshopRegister);
userRout.post("/login", userLogin);
userRout.post("/products", verifyToken , createProduct);
userRout.post("/products/import", verifyToken , upload.single('file'), csvFileUpload);
userRout.get("/products", getProducts);
userRout.get("/allproduct", verifyToken , getAllProduct);
userRout.patch("/products/undefined", verifyToken , editProduct);
userRout.patch("/products/:id", verifyToken , setStores);
userRout.patch("/products/csv/undefined", verifyToken , setCsvData);
userRout.post("/products/:id", verifyToken , deleteProduct);
userRout.patch("/products/update-webshop-status/undefined", verifyToken , markWebshopProduct);

export default userRout;
