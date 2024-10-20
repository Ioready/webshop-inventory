//imports packages
import mongoose from "mongoose";
import { genPass } from "../config/bcript.js";
import { auth } from "../middlewares/auth.js";
const { password, compairePass } = genPass;
const { genrateToken } = auth;

const { Schema, ObjectId } = mongoose;

const UserSchema = new Schema({
  name: {
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
    default:true
  },
  role:{
    type: String,
    default:"admin"
  },
  image:{
    type:String,
  }
},{timestamps:true});
//cnvrtPass
UserSchema.pre("save", async function () {
  const newPassword = await password(this.password);
  this.password = newPassword;
});
//compare password
UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await compairePass(password, this.password);
  return isMatch;
};
//jwtToken
UserSchema.methods.creatJwt = async function () {
  const token = await genrateToken(this._id);
  return token;
};
const User = mongoose.model("User", UserSchema, "User");

export default User;