import mongoose from "mongoose";

// Define the schema for the enquiry
const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The name field is required
    trim: true, // Removes any leading/trailing whitespaces
  },
  email: {
    type: String,
    required: true, // The email field is required
    trim: true,
    lowercase: true, // Converts the email to lowercase
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Basic email validation
  },
  phone: {
    type: String,
    required: true, // The phone field is required
    match: [/^\d{10}$/, 'Please fill a valid 10-digit phone number'], // Basic phone validation (10 digits)
  },
  message: {
    type: String,
    required: true, // The message field is required
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default:false, // Automatically set the creation date
  },
}, {
    timestamps: true,
  }
);

// Create the model based on the schema
const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
