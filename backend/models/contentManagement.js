import mongoose from "mongoose";

const cmsSchema = new mongoose.Schema({
  blogs: [{
    title: {
      type: String,
    },
    image: {
      type: [String],
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
    },
  }],
  herosection:[{
    image: {
      type: String,
    },
    description: {
      type: String,
    }
  }],
  footer: {
    logo: {
      type: String,
    },
    content: {
      type: String,
    },
    address: {
      type: String,
    },
    taxInformation: {
      type: String,
    },
    newsletterContent: {
      type: String,
    }
  },
  header:   {
    slogan: {
      type: String,
    },
    logo: {
      type: String,
    },
    phone: {
      type: String,
    },
    email:{
      type: String,
    }
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
  review: [{
    user: {
      type: String,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
    image: {
      type: String,
    },
    date: {
      type: Date,
    }
  }],
  termAndConditions: {
    content: {
      type: String,
    },
  },
  privacyPolicy: {
    content: {
      type: String,
    },
  },
  returnPolicy: {
    content: {
      type: String,
    },
  },
  aboutUs: {
    content: {
      type: String,
    },
  },
});

const ContentManagement = mongoose.model('ContentManagement', cmsSchema);

export default ContentManagement;
