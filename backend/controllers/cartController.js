import Cart from "../models/cart.js";
import Orders from "../models/order.js";
import { createMollieClient } from "@mollie/api-client";
import { v4 as uuidv4 } from "uuid";
import { user } from "./userController.js";
import webshopUser from "../models/webshopUser.js";

const mollie = createMollieClient({
  apiKey: "test_Utmg4rbUvwTggRaf3ADbsNx4jyTjdc",
});

export const cart = {
  addToCart: async (req, res) => {
    const { productId, quantity } = req.body;
    const { userId } = req.user;

    try {
      // Check if the cart item already exists
      let cartItem = await Cart.findOne({ userId, productId });

      if (cartItem) {
        // If it exists, update the quantity
        cartItem.quantity += quantity;
      } else {
        // If not, create a new cart item
        cartItem = new Cart({ userId, productId, quantity });
      }

      await cartItem.save();
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  },

  removeFromCart: async (req, res) => {
    const { productId } = req.body;
    const { userId } = req.user;
    try {
      await Cart.findOneAndDelete({ userId, productId });
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  },

  updateCartQuantity: async (req, res) => {
    const { productId, quantity } = req.body;
    const { userId } = req.user;
    try {
      const cartItem = await Cart.findOne({ userId, productId });

      if (!cartItem) {
        return res.status(404).json({ error: "Item not found in cart" });
      }

      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart quantity" });
    }
  },

  getCartItems: async (req, res) => {
    const { userId } = req.user;
    console.log(req, "req.user");
    try {
      const cartItems = await Cart.find({ userId }).select(
        "userId productId quantity"
      ); // Assuming Product schema has name, price, and image fields
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  },

  //   createOrder: async (req, res) => {
  //     // const { orderDetails } = req.body;
  //     // const { userId } = req.user;

  //     // try {
  //     //     // Create a new order document
  //     //     const newOrder = new Orders({
  //     //         userId,
  //     //         orderDetails: orderDetails.product.map(product => ({
  //     //             productId: product._id,
  //     //             quantity: product.quantity,
  //     //             totalAmount: orderDetails.totalWithTax,
  //     //         })),
  //     //         date: new Date(),
  //     //         address: orderDetails.address,
  //     //     });

  //     //     // Save the order to the database
  //     //     await newOrder.save();

  //     //     // Send a success response with the created order object
  //     //     res.status(201).json({
  //     //         message: 'Order created successfully',
  //     //         order: newOrder,
  //     //     });
  //     // } catch (error) {
  //     //     console.error('Error creating order:', error);
  //     //     res.status(500).json({ message: 'Error creating order' });
  //     // }
  //     try {
  //       // Destructure order data from request body
  //       const {
  //         orderItems,
  //         paymentDetails,
  //         shippingAddress,
  //         shippingDetails,
  //         totalOrderAmount,
  //       } = req.body;
  //      const {userId} = req.user;
  // console.log(
  //     req.body,req.user,"userid"
  // )
  //       // Basic validation for required fields
  //       if (
  //         !orderItems ||
  //         !paymentDetails ||
  //         !shippingAddress ||
  //         !totalOrderAmount
  //       ) {
  //         return res.status(400).json({ error: "Missing required fields." });
  //       }

  //       // Create a new order object
  //       const newOrder = new Orders({
  //         userId: userId ? userId : null,
  //         order_unique_id: `CBE${Date.now()}`, // Generate unique order ID
  //         orderItems,
  //         paymentDetails,
  //         shippingAddress,
  //         shippingDetails,
  //         totalOrderAmount,
  //       });

  //       // Save the order to the database
  //       const savedOrder = await newOrder.save();

  //       // Return success response
  //       res.status(201).json({
  //         message: "Order created successfully.",
  //         order: savedOrder,
  //       });
  //     } catch (error) {
  //       // Handle errors
  //       console.error(error);
  //       res.status(500).json({ error: "Failed to create order." });
  //     }
  //   },

  //   createOrder: async (req, res) => {
  //     try {
  //       const { orderDetails, totalWithTax, shippingDetails } = req.body;
  //       const { userId } = req.user;
  //       // Basic validation
  //       if (!orderDetails || !totalWithTax || !shippingDetails) {
  //         return res.status(400).json({ error: "Missing required fields." });
  //       }

  //       // Generate a Mollie payment
  //       const payment = await mollie.payments.create({
  //         amount: {
  //           currency: "EUR", // Replace with your desired currency
  //           value: totalWithTax.toFixed(2), // Ensure that it has 2 decimals
  //         },
  //         description: `Order Payment for ${orderDetails.address.firstName} ${orderDetails.address.lastName}`,
  //         redirectUrl: `http://localhost:3001/production`, // Redirect URL after payment
  //         webhookUrl: `http://localhost:5003/payment/mollie-webhook`, // Webhook to capture payment status
  //         metadata: {
  //           orderDetails, // Store order details to retrieve later
  //           shippingDetails,
  //           userId,
  //         },
  //       });

  //       // Send the payment link to the frontend
  //       res.status(200).json({
  //         paymentUrl: payment.getCheckoutUrl(),
  //         paymentId: payment.id, // You can track this ID
  //       });
  //     } catch (error) {
  //       console.error("Payment creation failed:", error);
  //       res.status(500).json({ error: "Payment creation failed." });
  //     }
  //   },

  createOrder: async (req, res) => {
    try {
      const { orderDetails, totalWithTax, shippingDetails } = req.body;
      const { userId } = req.user;

      let user = {};
      if (userId) {
        const userDetails = await webshopUser.findById(userId);
        if (userDetails) {
          console.log(userDetails, "ress");
          user = userDetails;
        }
      }

      // Basic validation
      if (!orderDetails || !totalWithTax || !shippingDetails) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Extract only the necessary details from the orderDetails
      const requiredOrderItems = orderDetails.product.map((item) => ({
        productId: item._id, // Assuming each item has productId
        quantity: item.quantity, // Assuming each item has quantity
        price: item.price, // Assuming each item has price
        name: item.title,
        totalAmount: parseFloat(item.quantity * item.price),
        images:item.images,
      }));

      // Step 1: Store the order in the database with a "Pending Payment" status
      // const order_unique_id = uuidv4(); // Generate a unique order ID
      const order_unique_id =`CBE${Date.now()}`
      const newOrder = new Orders({
        userId: userId || null,
        order_unique_id,
        orderItems: requiredOrderItems, // Assuming product is in orderDetails
        paymentDetails: {
          // transaction_id: null, // Will be updated after payment
          paymentMethod: "Mollie",
          paymentStatus: "Pending", // Set initial status as Pending
        },
        shippingAddress: {
          firstName: orderDetails.address.firstName,
          lastName: orderDetails.address.lastName,
          addressLine1: orderDetails.address.address,
          addressLine2: orderDetails.address.addressComplement || "",
          city: orderDetails.address.city,
          state: orderDetails.address.state,
          zipCode: orderDetails.address.zipCode,
          country: orderDetails.address.country,
          phone: orderDetails.address.phone,
          email: user.email 
        },
        shippingDetails: {
            shipmentProvider:shippingDetails.shipmentProvider, // Example, you can update with the actual provider
            shipmentStatus: "Not Shipped",
          },
        totalOrderAmount: totalWithTax,
        orderStatus: "Pending", // Initial status
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();

      // Step 2: Generate a Mollie payment, only store order ID in metadata
      const payment = await mollie.payments.create({
        amount: {
          currency: "EUR", // Replace with your desired currency
          value: totalWithTax.toFixed(2), // Ensure that it has 2 decimals
        },
        description: `Order Payment for ${orderDetails.address.firstName} ${orderDetails.address.lastName}`,
        redirectUrl: `https://webshop-ecommerce-3rbt.vercel.app/payment-success`, // Redirect URL after payment
        // webhookUrl: `https://70a2-2405-201-3030-a0c0-9481-f130-90b1-fa00.ngrok-free.app/payment/mollie-webhook`, // Webhook to capture payment status
        webhookUrl: `https://api.ioready.io/payment/mollie-webhook`, // Webhook to capture payment status
        metadata: {
          orderId: savedOrder._id, // Store only the order ID to track the order
        },
      });

      // Step 3: Update the order with the transaction ID
      savedOrder.paymentDetails.transaction_id = payment.id;
      await savedOrder.save();

      // Send the payment link to the frontend
      res.status(200).json({
        paymentUrl: payment.getCheckoutUrl(),
        paymentId: payment.id, // You can track this ID
      });
    } catch (error) {
      console.error("Payment creation failed:", error);
      res.status(500).json({ error: "Payment creation failed." });
    }
  },

  getOrder: async (req, res) => {
    try {
      // Fetch all orders from the database
      const orders = await Orders.find()
        .populate("userId").select("-password") // Populate user details if there's a User collection
        .populate("orderItems.productId") // Populate product details if there's a Product collection
        .exec();

      // Send the retrieved orders as a response
      res.status(200).json({
        message: "Orders fetched successfully",
        orders: orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders" });
    }
  },

  deleteOrder: async (req, res) => {
    // const { orderId } = req.body;
    const idsArray = req.body.body._id;
    try {
      // Find and delete the order by its ID
      const deletedOrder = await Orders.deleteMany({ order_unique_id: { $in: idsArray } });

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Send a success response
      res.status(200).json({
        message: "Order deleted successfully",
        order: deletedOrder,
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Error deleting order" });
    }
  },

  updateOrderStatus : async (req, res) => {
    try {
      const { orderId, newStatus } = req.body; // Get orderId and newStatus from the request body
  console.log(orderId, newStatus);
      // Basic validation
      if (!orderId || !newStatus) {
        return res.status(400).json({ error: "Missing orderId or newStatus." });
      }
  
      // Check if the newStatus is valid
      const validStatuses = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
        "Placed",
      ];
      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ error: "Invalid order status." });
      }
  
      // Find the order by its ID and update the status
      const order = await Orders.findOne({ order_unique_id: orderId });
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }
  
      // Update the order status
      order.orderStatus = newStatus;
      await order.save();
  
      res.status(200).json({
        message: `Order status updated to '${newStatus}' successfully.`,
        order,
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      res.status(500).json({ error: "Failed to update order status." });
    }
  },
};
