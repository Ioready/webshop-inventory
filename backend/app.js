import express  from "express";
import dotenv from "dotenv"
import cors from "cors"

import userRout from "./routes/user.js";
import connectDB from "./config/db.js";

const app = express()
dotenv.config()

connectDB()

const port = process.env.PORT 

app.use(express.json({limit : "10mb"}))
app.use(cors())

app.use('/',userRout);

app.listen(port, ()=>{
    console.log(`server connected ${port}`);
})