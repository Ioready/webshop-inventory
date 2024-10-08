//imports packages
import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const ProductSchema = new Schema(
  {
    status: {
      type: Boolean,
      default: true,
    },
    sku: {
      type: Number,
      unique: true,
    },
    ean: String,
    language: String,
    categories: String,
    subCategories:String,
    subSubCategories:String,
    title: String,
    description: String,
    images: [String],
    totalStock:String,
    isWebshopProduct:Boolean,
    bestProduct:Boolean,
    topProduct:Boolean,
    popularProduct:{
      type: Boolean,
      default: false,
    },
    tags: String,
    weight: Number,
    taxValue: Number,
    supplierRef: String,
    brand: String,
    size: String,
    sizeMixed: String,
    colors: String,
    dogJacketType: String,
    supplier: String,
    dogJacketSize: String,
    scanCode: String,
    purchasePrice: Number,
    price: String,
    platform: String,
    stores: [],
    minSellingPrice: Number,
    stockedOutStatment:String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema, "Product");

export default Product;
