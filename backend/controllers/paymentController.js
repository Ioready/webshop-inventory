import { createMollieClient } from "@mollie/api-client";
import Orders from "../models/order.js"; // Import your Order model
import { v4 as uuidv4 } from 'uuid';
import sendMail from "../middlewares/sendEmail.js";
// Initialize the Mollie client
const mollie = createMollieClient({ apiKey: "test_Utmg4rbUvwTggRaf3ADbsNx4jyTjdc" });

const createPayment = async (req, res) => {
  try {
    const { orderDetails, totalWithTax } = req.body;

    // Basic validation
    if (!orderDetails || !totalWithTax) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Create a Mollie payment
    const payment = await mollie.payments.create({
      amount: {
        currency: "EUR", // Replace with your desired currency
        value: totalWithTax.toFixed(2), // Ensure that it has 2 decimals
      },
      description: `Order Payment for ${orderDetails.address.firstName} ${orderDetails.address.lastName}`,
      redirectUrl: `${process.env.CLIENT_URL}/payment-success`, // Redirect URL after payment
      webhookUrl: `${process.env.SERVER_URL}/mollie-webhook`, // Webhook to capture payment status
      metadata: {
        orderDetails, // Store order details to retrieve later
      },
    });

    // Send the payment link to the frontend
    res.status(200).json({
      paymentUrl: payment.getCheckoutUrl(),
      paymentId: payment.id, // You can track this ID
    });
  } catch (error) {
    console.error("Payment creation failed:", error);
    res.status(500).json({ error: "Payment creation failed." });
  }
};

// // Webhook to handle payment status updates
// const mollieWebhook = async (req, res) => {
//   try {
//     const paymentId = req.body.id;
//     console.log(paymentId,"payaya")
//     const payment = await mollie.payments.get(paymentId);

//     if (payment.status === "paid") {
//       // Retrieve the order using the order ID from metadata
//       const orderId = payment.metadata.orderId;
//       const order = await Orders.findById(orderId);

//       if (!order) {
//         return res.status(404).send("Order not found.");
//       }

//       // Update the order details and payment status
//       order.paymentDetails.paymentStatus = "Completed";
//       order.orderStatus = "Shipped"; // Update the status to 'Placed'
//       order.shippingDetails.trackingNumber = uuidv4(); // Generate a tracking number

//       // Save the updated order
//       const savedOrder = await order.save();
//       console.log("Order updated after successful payment:", savedOrder);

//       // Respond to Mollie with a success message
//       res.status(200).send("Payment status updated successfully.");
//     } else {
//       // Handle other payment statuses such as failed or pending
//       res.status(200).send(`Payment status: ${payment.status}`);
//     }
//   } catch (error) {
//     console.error("Error in Mollie Webhook:", error);
//     res.status(500).send("Failed to process Mollie webhook.");
//   }
// };


// Mollie Webhook
const mollieWebhook = async (req, res) => {
  try {
    const paymentId = req.body.id;
    console.log(paymentId, "paymentId");

    // Fetch payment details from Mollie
    const payment = await mollie.payments.get(paymentId);

    if (payment.status === "paid") {
      // Retrieve the order using the order ID from metadata
      const orderId = payment.metadata.orderId;
      const order = await Orders.findById(orderId);

      if (!order) {
        return res.status(404).send("Order not found.");
      }

      // Update the order details and payment status
      order.paymentDetails.paymentStatus = "Completed";
      order.orderStatus = "Placed"; // Update the status to 'Shipped'
      order.shippingDetails.trackingNumber = uuidv4(); // Generate a tracking number

      // Save the updated order
      const savedOrder = await order.save();
      console.log("Order updated after successful payment:", savedOrder);

      // Send an email to the customer
      const customerEmail = order.shippingAddress.email;
      const emailSubject = `Order Confirmation - ${order.order_unique_id}`;
      const emailText = `Your order has been placed successfully. Order ID: ${order.order_unique_id}. Tracking Number: ${order.shippingDetails.trackingNumber}.`;
      const emailHtml = `
        <div>
          <h3>Order Confirmation</h3>
          <p>Dear ${order.shippingAddress.firstName},</p>
          <p>Thank you for your order! Your order <b>${order.order_unique_id}</b> has been successfully placed.</p>
          <p><b>Tracking Number:</b> ${order.shippingDetails.trackingNumber}</p>
        </div>
      `;

      // Use the `sendMail` function from the middleware to send the email
      try {
        await sendMail({
          to: customerEmail,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });
        console.log("Order confirmation email sent to:", customerEmail);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }

      // Respond to Mollie with a success message
      res.status(200).send("Payment status updated and email sent successfully.");
    } else {
      // Handle other payment statuses such as failed or pending
      res.status(200).send(`Payment status: ${payment.status}`);
    }
  } catch (error) {
    console.error("Error in Mollie Webhook:", error);
    res.status(500).send("Failed to process Mollie webhook.");
  }
};


export { createPayment, mollieWebhook };
