import express from 'express';
import { addEnquiry, getAllEnquiry, getEnquiryById } from '../controllers/enquiryController.js';

const router = express.Router();

// Route to get all enquiries
router.get('/', getAllEnquiry);

// Route to add a new enquiry
router.post('/', addEnquiry);

// Route to get an enquiry by ID
router.get('/:id', getEnquiryById);

export default router;
