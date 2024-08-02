import mongoose from "mongoose";

const cmsSchema = new mongoose.Schema({
  blogs: {
    type: String,
  },
  herosection: {
    type: String,
  },
  footer: {
    type: String,
  },
  header: {
    type: String,
  },
  topProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  bestSellingProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  topCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  review: {
    type: String,
  },
  termAndConditions: {
    type: String,
  },
  privacyPolicy: {
    type: String,
  },
  returnPolicy: {
    type: String,
  },
  aboutUs: {
    type: String,
  },
});

const ContentManagement = mongoose.model('ContentManagement', cmsSchema);

export default ContentManagement;