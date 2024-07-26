import mongoose from "mongoose";
import { genPass } from "../config/bcript.js";
import { auth } from "../middlewares/auth.js";
const { password, compairePass } = genPass;
const { genrateToken } = auth;

const { Schema, ObjectId } = mongoose;

const webshopUserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  isEmailVerified:{
    type:Boolean,
    default:true,
  },
 
},{timestamps:true});

  // webshopUserSchema.pre("save", async function () {
  //   const newPassword = await password(this.password);
  //   this.password = newPassword;
  // });
  // Compare password
  // webshopUserSchema.newPasswordmethods.comparePassword = async function (password) {
  //   console.log('password',password,this.password, await compairePass(password, this.password));
  //   return await compairePass(password, this.password);
  // };
  
  // Generate JWT
  webshopUserSchema.methods.creatJwt = async function () {
    const token = await genrateToken(this._id);
    return token;
  };
const webshopUser = mongoose.model("webshopUser", webshopUserSchema, "webshopUser");

export default webshopUser;