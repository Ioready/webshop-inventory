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
  ad:[{
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
