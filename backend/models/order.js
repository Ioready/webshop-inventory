const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema(
  {
    billNumber: {
      type: String,
    },
    customerId: {
      type: ObjectId,
      ref: "Customer",
    },
    cartId: {
      type: ObjectId,
      ref: "Cart",
    },

    // store: {
    //   type: ObjectId,
    //   ref: "Store",
    // },
    // pos: {
    //   type: ObjectId,
    //   ref: "Pos",
    // },

    item: [
      {
        product: {
          type: ObjectId,
          ref: "Item",
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
        variant: {
          type: String,
        },
        tableNumber: {
          type: String,
        },
        is_canceled: {
          type: Boolean,
          default: false,
        },
        modifier: [
          {
            name: {
              type: String,
            },
            quantity: {
              type: Number,
              default: 1,
            },
            price: {
              type: Number,
            },
          },
        ],
      },
    ],
    employeeId: {
      type: ObjectId,
      ref: "Employee",
    },
    orderType: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: String,
    },
    delivered_date: {
      type: Date,
    },
    totalPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    tax: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
    },
    refund: {
      type: Number,
      default: 0,
    },

    orderStatus: {
      type: String,
    },
    customer_cancelled: {
      type: Boolean,
      default: false,
    },
    employee_cancelled: {
      type: Boolean,
      default: false,
    },
    return_reason: {
      type: String,
    },
    is_returned: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Array,
    },
    paymentType:{
      type: String
    },
    paymentStatus: {
      type: String,
    },
    amountRecieved: {
      type: Number,
    },
    balanceAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", Schema);

module.exports = Orders;
