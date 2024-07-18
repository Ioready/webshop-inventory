//imports packages
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { genPass } from "../config/bcript.js";
import { auth } from "../middlewares/auth.js";

const { password, comparePass } = genPass;
const { genrateToken } = auth;

const { Schema, ObjectId } = mongoose;

const webshopUserSchema = new Schema({
  title:{
    type:String,
    },
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
  offers:{
    type:Boolean,
    default:false,
  },
  privacy:{
    type:Boolean,
    default:false,
  },
  newsletter:{
    type:Boolean,
    default:false,
  }
},{timestamps:true});
//cnvrtPass
// webshopUserSchema.pre("save", async function () {
//   const newPassword = await password(this.password);
//   this.password = newPassword;
// });
// //compare password
// webshopUserSchema.methods.comparePassword = async function (password) {
//   const isMatch = await compairePass(password, this.password);
//   return isMatch;
// };
// //jwtToken
// webshopUserSchema.methods.creatJwt = async function () {
//   const token = await genrateToken(this._id);
//   return token;
// };


webshopUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Compare password
  webshopUserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  // Generate JWT
  webshopUserSchema.methods.createJwt = function () {
    return auth.generateToken(this._id); // assuming auth.generateToken creates JWT
  };
const webshopUser = mongoose.model("webshopUser", webshopUserSchema, "webshopUser");

export default webshopUser;