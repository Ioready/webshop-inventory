import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'webshopUser',
    },
    orderDetails:[{
      productId: {
        type: ObjectId, 
        ref: 'Product',
      },
      quantity: { 
        type: Number, 
        required: true, 
        default: 1 
      },
      totalAmount:{
        type: Number, 
      },
    }],
    date: {
      type: String,
    },
    address: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: false, // Optional field
      },
      address: {
        type: String,
        required: true,
      },
      addressComplement: {
        type: String,
        required: false, // Optional field
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: false, // Optional field
      },
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", Schema);

export default Orders;
