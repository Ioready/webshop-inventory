import express from "express";
import { createPayment, mollieWebhook } from "../controllers/paymentController.js";

const router = express.Router();

// Route to get all enquiries
router.post("/create", createPayment);

// Route to add a new enquiry
router.post("/mollie-webhook", mollieWebhook);
export default router;
