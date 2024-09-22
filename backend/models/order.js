// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;

// const Schema = mongoose.Schema(
//   {
//     userId: {
//       type: ObjectId,
//       ref: 'webshopUser',
//     },
//     orderDetails:[{
//       productId: {
//         type: ObjectId,
//         ref: 'Product',
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         default: 1
//       },
//       totalAmount:{
//         type: Number,
//       },
//     }],
//     date: {
//       type: String,
//     },
//     address: {
//       firstName: {
//         type: String,
//         required: true,
//       },
//       lastName: {
//         type: String,
//         required: true,
//       },
//       company: {
//         type: String,
//         required: false, // Optional field
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//       addressComplement: {
//         type: String,
//         required: false, // Optional field
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       state: {
//         type: String,
//         required: true,
//       },
//       zipCode: {
//         type: String,
//         required: true,
//       },
//       country: {
//         type: String,
//         required: true,
//       },
//       phone: {
//         type: String,
//         required: false, // Optional field
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Orders = mongoose.model("Orders", Schema);

// export default Orders;

// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;

// // Create the schema for an individual product in an order
// const orderItemSchema = new mongoose.Schema({
//   productId: {
//     type: ObjectId,
//     ref: "Product",
//     required: false, // Reference to the product
//     default: null,
//   },
//   name: {
//     type: String,
//     required: true, // Store product name to avoid further lookups
//   },
//   price: {
//     type: Number,
//     required: true, // Price per unit of the product
//     min: 0,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1, // Enforce at least 1 quantity
//     default: 1,
//   },
//   totalAmount: {
//     type: Number,
//     required: true,
//     min: 0, // Total price for this product (price * quantity)
//   },
//   shipmentId: {
//     type: ObjectId, // Reference to shipment for tracking purposes
//     ref: "Shipment",
//   },
// });

// // Create the schema for the overall order
// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: ObjectId,
//       ref: "User", // Reference to the user who placed the order
//       required: true,
//     },
//     order_unique_id: {
//       type: String,
//       required: true,
//       unique: true, // Unique order ID for tracking
//     },
//     orderItems: [orderItemSchema], // Array of products ordered
//     paymentDetails: {
//       transaction_id: {
//         type: String,
//         required: true,
//         unique: true, // Unique transaction ID from the payment gateway
//       },
//       paymentMethod: {
//         type: String,
//         required: true, // Payment method (e.g., 'Credit Card', 'PayPal', 'UPI', etc.)
//       },
//       paymentStatus: {
//         type: String,
//         enum: ["Pending", "Completed", "Failed", "Refunded"],
//         default: "Pending", // Payment status of the order
//       },
//     },
//     shippingAddress: {
//       firstName: {
//         type: String,
//         required: true,
//       },
//       lastName: {
//         type: String,
//         required: true,
//       },
//       addressLine1: {
//         type: String,
//         required: true,
//       },
//       addressLine2: {
//         type: String,
//         required: false,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       state: {
//         type: String,
//         required: true,
//       },
//       zipCode: {
//         type: String,
//         required: true,
//       },
//       country: {
//         type: String,
//         required: true,
//       },
//       phone: {
//         type: String,
//         required: true,
//       },
//     },
//     shippingDetails: {
//       shipmentProvider: {
//         type: String,
//         required: false, // e.g., 'FedEx', 'DHL', 'Amazon Logistics', etc.
//       },
//       shipmentStatus: {
//         type: String,
//         enum: [
//           "Not Shipped",
//           "Shipped",
//           "In Transit",
//           "Out for Delivery",
//           "Delivered",
//         ],
//         default: "Not Shipped", // Shipment status for the order
//       },
//       trackingNumber: {
//         type: String,
//         required: false, // Optional field for shipment tracking number
//       },
//       estimatedDeliveryDate: {
//         type: Date,
//         required: false,
//       },
//     },
//     orderStatus: {
//       type: String,
//       enum: [
//         "Pending",
//         "Confirmed",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//         "Returned",
//       ],
//       default: "Pending", // Overall status of the order
//     },
//     totalOrderAmount: {
//       type: Number,
//       required: true,
//       min: 0, // Total amount for the entire order
//     },
//     orderDate: {
//       type: Date,
//       default: Date.now, // Automatically set the order date
//     },
//     cancellationReason: {
//       type: String,
//       required: false, // Store reason for order cancellation, if applicable
//     },
//     user: {
//       type: String,
//       enum: ["webShopUser", "GuestUser"],
//       defaullt: "GuestUser",
//     },
//   },
//   {
//     timestamps: true, // Automatically add createdAt and updatedAt timestamps
//   }
// );

// // Add necessary indexes for efficient querying
// orderSchema.index({ order_unique_id: 1 });
// // orderSchema.index({ userId: 1 });
// orderSchema.index({ "paymentDetails.transaction_id": 1 });

// // Export the model
// const Order = mongoose.model("Order", orderSchema);

// export default Order;

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

// Create the schema for an individual product in an order
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: ObjectId,
    ref: "Product",
    required: false, // Reference to the product
    default: null,
  },
  name: {
    type: String,
    required: true, // Store product name to avoid further lookups
  },
  price: {
    type: Number,
    required: true, // Price per unit of the product
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Enforce at least 1 quantity
    default: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0, // Total price for this product (price * quantity)
  },
  shipmentId: {
    type: ObjectId, // Reference to shipment for tracking purposes
    auto: true,
  },
  // _id: {
  //   type: ObjectId,
  //   auto: true, // Automatically generated _id, acts as the shipment_id
  // },
});

// Create the schema for the overall order
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "webshopUser", // Reference to the user who placed the order
      required: true,
    },
    order_unique_id: {
      type: String,
      required: true,
      unique: true, // Unique order ID for tracking
    },
    orderItems: [orderItemSchema], // Array of products ordered
    paymentDetails: {
      transaction_id: {
        type: String,
        required: false,
        // unique: true, // Unique transaction ID from the payment gateway
      },
      paymentMethod: {
        type: String,
        required: true, // Payment method (e.g., 'Credit Card', 'PayPal', 'UPI', etc.)
      },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending", // Payment status of the order
      },
    },
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
        required: false,
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
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regular expression for basic email validation
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      birthDate: {
        type: String,
        default: "",
        required: false, // Optional field for user's birth date
        // validate: {
        //   validator: function (value) {
        //     return value instanceof Date && !isNaN(value.getTime());
        //   },
        //   message: 'Invalid birth date!',
        // },
      },
    },
    shippingDetails: {
      shipmentProvider: {
        type: String,
        required: false, // e.g., 'FedEx', 'DHL', 'Amazon Logistics', etc.
      },
      shipmentStatus: {
        type: String,
        enum: [
          "Not Shipped",
          "Shipped",
          "In Transit",
          "Out for Delivery",
          "Delivered",
        ],
        default: "Not Shipped", // Shipment status for the order
      },
      trackingNumber: {
        type: String,
        required: false, // Optional field for shipment tracking number
      },
      estimatedDeliveryDate: {
        type: Date,
        required: false,
      },
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
        "Placed"
      ],
      default: "Pending", // Overall status of the order
    },
    totalOrderAmount: {
      type: Number,
      required: true,
      min: 0, // Total amount for the entire order
    },
    orderDate: {
      type: Date,
      default: Date.now, // Automatically set the order date
    },
    cancellationReason: {
      type: String,
      required: false, // Store reason for order cancellation, if applicable
    },
    user: {
      type: String,
      enum: ["webShopUser", "GuestUser"],
      default: "GuestUser",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Add necessary indexes for efficient querying
orderSchema.index({ order_unique_id: 1 });
// orderSchema.index({ "paymentDetails.transaction_id": 1 });

// Export the model
const Order = mongoose.model("Order", orderSchema);

export default Order;
