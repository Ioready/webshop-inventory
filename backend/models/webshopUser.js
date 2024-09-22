import mongoose from "mongoose";
import { genPass } from "../config/bcript.js";
import { auth } from "../middlewares/auth.js";
const { password, compairePass } = genPass;
const { genrateToken } = auth;
import jwt from 'jsonwebtoken';

const { Schema, ObjectId } = mongoose;

const webshopUserSchema = new Schema(
  {
    title: {
      type: String,
      // enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'], // You can add more titles as needed
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
    birthDate: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["GuestUser", "webShopUser"],
      default: "GuestUser",
      required: true,
    },
  },
  { timestamps: true }
);

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
// webshopUserSchema.methods.creatJwt = async function () {
//   const token = await genrateToken(this._id);
//   return token;
// };
// webshopUserSchema.methods.creatJwt = function () {
//   // Generate the token with user ID and additional payload (e.g., email, type)
//   const token = jwt.sign(
//     { _id: this._id, email: this.email, type: this.type }, // Payload
//     process.env.JWT_SECRET, // Secret key for signing
//     { expiresIn: '1h' } // Token expiration (optional)
//   );
//   return token;
// };

const webshopUser = mongoose.model(
  "webshopUser",
  webshopUserSchema,
  "webshopUser"
);

export default webshopUser;
